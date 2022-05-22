from django.db import models
from django.utils.translation import gettext_lazy as _

from core import managers


# Create your models here.
class ModelBase(models.Model):
    id = models.BigAutoField(
        db_column='id',
        primary_key=True
    )
    created_at = models.DateTimeField(
        db_column='dt_created',
        auto_now_add=True,
        null=True,
        blank=True,
        verbose_name=_('Created at')
    )
    modified_at = models.DateTimeField(
        db_column='dt_modified',
        auto_now=True,
        null=True,
        blank=True,
        verbose_name=_('Modified at')
    )

    class Meta:
        abstract = True


class Aircraft(ModelBase):
    description = models.CharField(
        db_column='tx_description',
        max_length=128,
        blank=True,
        null=True,
        verbose_name=_('Description')
    )
    valuation_date = models.DateField(
        db_column='dt_valuation',
        null=True,
        blank=True,
        verbose_name=_('Valuation date')
    )
    appraised_value = models.DecimalField(
        db_column='nb_appraised_value',
        max_digits=27,
        decimal_places=2,
        null=True,
        blank=True,
        verbose_name=_('Appraised value')
    )
    depreciation_rate = models.DecimalField(
        db_column='nb_depreciation_rate',
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True,
        verbose_name=_('Deppreciation rate')
    )
    initial_used_life = models.IntegerField(
        db_column='nb_initial_used_life',
        null=True,
        blank=True,
        verbose_name=_('Initial used life'),
    )
    check_interval = models.IntegerField(
        db_column='nb_check_interval',
        null=True,
        blank=True,
        verbose_name=_('Check interval'),
    )
    min_check_cost = models.DecimalField(
        db_column='nb_min_check_cost',
        max_digits=27,
        decimal_places=2,
        null=True,
        blank=True,
        default=None,
        verbose_name=_('MIN Check cost')
    )
    max_check_cost = models.DecimalField(
        db_column='nb_max_check_cost',
        max_digits=27,
        decimal_places=2,
        null=True,
        blank=True,
        default=None,
        verbose_name=_('MAX Check cost')
    )

    def __str__(self) -> str:
        return self.description

    class Meta:
        managed = True
        db_table = 'aircraft'
        verbose_name = _('Aircraft')
        verbose_name_plural = _('Aircrafts')


class Lease(ModelBase):
    aircraft = models.ForeignKey(
        'Aircraft',
        on_delete=models.CASCADE,
        db_column='id_aircraft',
        db_index=False,
        related_name='lease_aircrafts',
        null=True,
        blank=True,
        verbose_name=_('Aircraft')
    )
    economic_closing_date = models.DateField(
        db_column='dt_economic_closing',
        null=True,
        blank=True,
        verbose_name=_('Economic closing date')
    )
    net_price = models.DecimalField(
        db_column='nb_net_price',
        max_digits=27,
        decimal_places=2,
        null=True,
        blank=True,
        verbose_name=_('Net price')
    )
    start_date = models.DateField(
        db_column='dt_start',
        null=True,
        blank=True,
        verbose_name=_('Start date')
    )
    end_date = models.DateField(
        db_column='dt_end',
        null=True,
        blank=True,
        verbose_name=_('End date')
    )
    monthly_rent = models.DecimalField(
        db_column='nb_monthly_rent',
        max_digits=27,
        decimal_places=2,
        null=True,
        blank=True,
        verbose_name=_('Montly rent')
    )
    monthly_mr_rent = models.DecimalField(
        db_column='nb_monthly_mr_rent',
        max_digits=27,
        decimal_places=2,
        null=True,
        blank=True,
        verbose_name=_('Monthly MR rent')
    )
    expected_irr = models.DecimalField(
        db_column='nb_expected_irr',
        max_digits=12,
        decimal_places=2,
        null=True,
        blank=True,
        verbose_name=_('Expected IRR(%)')
    )

    def __str__(self) -> str:
        return f'{self.aircraft} - {self.start_date} - {self.end_date}'

    class Meta:
        managed = True
        db_table = 'lease'
        verbose_name = _('Lease')
        verbose_name_plural = _('Leases')


class CashFlow(ModelBase):
    lease = models.ForeignKey(
        'Lease',
        on_delete=models.CASCADE,
        db_column='id_lease',
        db_index=False,
        related_name='cashflow_leases',
        null=True,
        blank=True,
        verbose_name=_('Lease')
    )
    due_date = models.DateField(
        db_column='dt_due',
        null=True,
        blank=True,
        verbose_name=_('Due date')
    )
    cash_flow = models.DecimalField(
        db_column='nb_cash_flow',
        max_digits=27,
        decimal_places=2,
        null=True,
        blank=True,
        verbose_name=_('Cash flow')
    )
    mr_balance = models.DecimalField(
        db_column='nb_mr_balance',
        max_digits=27,
        decimal_places=2,
        null=True,
        blank=True,
        verbose_name=_('MR Balance')
    )
    description = models.CharField(
        db_column='tx_description',
        max_length=128,
        blank=True,
        null=True,
        verbose_name=_('Description')
    )

    objects = managers.CashFlowManager()

    class Meta:
        managed = True
        db_table = 'cash_flow'
        verbose_name = _('Cash flow')
        verbose_name_plural = _('Cash flows')
