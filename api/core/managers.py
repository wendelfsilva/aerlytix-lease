from django.db.models import Manager


class CashFlowManager(Manager):
    def find_all_values_by_lease(self, lease_id: int):
        return self.filter(
            lease_id=lease_id
        ).values_list(
            'cash_flow',
            flat=True
        )

    def create_all_by_lease(self, lease_id: int, instances: list):
        # cleaning cashflow for current lease
        self.filter(lease_id=lease_id).delete()

        # inserting all of them
        return self.bulk_create(objs=instances)
