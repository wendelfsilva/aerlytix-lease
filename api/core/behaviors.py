from datetime import datetime
from random import randrange

from numpy_financial import irr

from core import helpers, models


class GenerateSimulation:
    def __init__(self, lease: dict):
        self._lease: 'models.Lease' = models.Lease.objects.get(pk=lease['id'])
        self._aircraft: 'models.Aircraft' = self._lease.aircraft

    # function to generate the period range between two dates
    def _generate_period(self):
        start = self._lease.start_date.replace(day=1)
        end = self._lease.end_date.replace(day=1)
        return helpers.generate_dates(start_date=start, end_date=end)

    # function to generate random maintenance value
    def _generate_maintenance_value(self):
        return randrange(self._aircraft.min_check_cost, self._aircraft.max_check_cost)

    # calculating IRR (%)
    def _update_expected_irr(self):
        cash_flows = models.CashFlow.objects.find_all_values_by_lease(
            lease_id=self._lease.id
        )

        self._lease.expected_irr = round(irr(list(cash_flows)) * 100, 2)
        self._lease.save()

    # create cash flow object
    def _create_cash_flow(
        self,
        date: datetime,
        value: float,
        mr_value: float,
        description: str = 'rent + MR',
    ):

        # if date was not the first date I would calculate the date diff
        if date.day != 1:
            value_per_day = value / 30
            value = value_per_day * helpers.date_diff_in_days(date1=date)

            description += ' (partial month)'

        obj = {
            'lease': self._lease,
            'due_date': date,
            'cash_flow': value,
            'mr_balance': mr_value,
            'description': description
        }

        return models.CashFlow(**obj)

    def _create_initial_investment(self):
        # creating flow to ECD
        obj = {
            'lease': self._lease,
            'due_date': self._lease.economic_closing_date,
            'cash_flow': self._lease.net_price * -1,
            'mr_balance': None,
            'description': 'Net Price on ECD'
        }

        return models.CashFlow(**obj)

    def _create_installments(self):
        data = []

        # mr balance acumulate
        mr_balance_sum = 0
        used_life_sum = self._aircraft.initial_used_life

        # looping period
        for date in self._generate_period():

            # building all infos
            description = 'rent + MR'

            # check if is the first date, if so get max date
            if date.month == self._lease.start_date.month \
                and date.year == self._lease.start_date.year:
                date = max(date, self._lease.start_date)

            # increase used life
            mr_balance_sum += float(self._lease.monthly_rent)
            used_life_sum += 1

            # check if have to do the maintenance
            if used_life_sum == self._aircraft.check_interval:
                used_life_sum = 0
                description += ' - maintenance check cost'

                maintenance_value = self._generate_maintenance_value()
                mr_balance_sum -= maintenance_value
                if mr_balance_sum < 0:
                    mr_balance_sum = 0

            obj = self._create_cash_flow(
                date=date,
                value=self._lease.monthly_rent,
                mr_value=mr_balance_sum,
                description=description
            )
            data.append(obj)

        return data, mr_balance_sum

    def _create_residual_value(self, mr_balance: float):
        # get date diff in days
        date_diff_in_days = helpers.date_diff_in_days(self._lease.end_date, self._aircraft.valuation_date)
        depreciation_rate = float(self._aircraft.depreciation_rate) * (date_diff_in_days / 365)
        residual_value = float(self._aircraft.appraised_value) - (float(self._aircraft.depreciation_rate) * depreciation_rate)

        # creating flow to sale + residual value
        obj = {
            'lease': self._lease,
            'due_date': self._lease.end_date,
            'cash_flow': round(float(residual_value + mr_balance), 2),
            'mr_balance': 0,
            'description': 'Aircraft sale (%.2f) + MR balance leftover (%.2f)' % (residual_value, mr_balance)
        }

        return models.CashFlow(**obj)

    def _create_cash_flows(self):
        instances = []

        # creating initial investment
        obj = self._create_initial_investment()
        instances.append(obj)

        # creating installments
        objs, mr_balance = self._create_installments()
        instances.extend(objs)

        # creating residual values
        obj = self._create_residual_value(mr_balance=mr_balance)
        instances.append(obj)

        # cleaning cashflow for current lease
        models.CashFlow.objects.create_all_by_lease(
            lease_id=self._lease.id,
            instances=instances
        )

    def run(self):
        # generate cash flows
        self._create_cash_flows()

        # generate expected irr
        self._update_expected_irr()

        return {
            'expected_irr': self._lease.expected_irr
        }
