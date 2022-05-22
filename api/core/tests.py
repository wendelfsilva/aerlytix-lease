from django.test import TestCase
from django.test.utils import setup_test_environment, teardown_test_environment
from numpy_financial import irr

from core import behaviors, models

teardown_test_environment()
setup_test_environment()


class CashFlowTestCase(TestCase):
    fixtures = [
        'aircraft',
        'lease',
    ]

    def test_expected_irr(self):
        simulation = behaviors.GenerateSimulation(lease={'id': 1})
        data = simulation.run()

        cash_flows = models.CashFlow.objects.find_all_values_by_lease(lease_id=1)
        expected_irr = round(irr(list(cash_flows)) * 100, 2)

        self.assertEquals(data['expected_irr'], expected_irr)
