from django_filters import filterset

from core import models

LIKE = 'icontains'
EQUALS = 'exact'
LTE = 'lte'
GTE = 'gte'


class AircraftFilter(filterset.FilterSet):
    id = filterset.NumberFilter(lookup_expr=EQUALS)
    description = filterset.CharFilter(lookup_expr=LIKE)

    class Meta:
        model = models.Aircraft
        fields = [
            'id',
            'description',
        ]


class LeaseFilter(filterset.FilterSet):
    id = filterset.NumberFilter(lookup_expr=EQUALS)
    aircraft = filterset.NumberFilter(lookup_expr=EQUALS)
    aircraft_description = filterset.CharFilter(field_name='aircraft__description', lookup_expr=LIKE)
    start_date = filterset.DateFilter(lookup_expr=GTE)
    end_date = filterset.DateFilter(lookup_expr=LTE)

    class Meta:
        model = models.Lease
        fields = [
            'id',
            'aircraft',
            'aircraft_description',
            'start_date',
            'end_date',
        ]


class CashFlowFilter(filterset.FilterSet):
    id = filterset.NumberFilter(lookup_expr=EQUALS)
    lease = filterset.NumberFilter(lookup_expr=EQUALS)

    class Meta:
        model = models.CashFlow
        fields = [
            'id',
            'lease',
        ]
