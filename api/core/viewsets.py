from rest_framework import viewsets

from core import behaviors, filters, models, serializers


class AircraftViewSet(viewsets.ModelViewSet):
    queryset = models.Aircraft.objects.all()
    serializer_class = serializers.AircraftSerializer
    filter_class = filters.AircraftFilter
    ordering_fields = '__all__'
    ordering = ('-id',)


class LeaseViewSet(viewsets.ModelViewSet):
    queryset = models.Lease.objects.all()
    serializer_class = serializers.LeaseSerializer
    filter_class = filters.LeaseFilter
    ordering_fields = '__all__'
    ordering = ('-id',)

    def create(self, request, *args, **kwargs):
        response = super(LeaseViewSet, self).create(request, *args, **kwargs)

        simulation = behaviors.GenerateSimulation(lease=response.data)
        response.data.update(simulation.run())

        return response

    def update(self, request, *args, **kwargs):
        response = super(LeaseViewSet, self).update(request, *args, **kwargs)

        simulation = behaviors.GenerateSimulation(lease=response.data)
        response.data.update(simulation.run())

        return response


class CashFlowViewSet(viewsets.ModelViewSet):
    queryset = models.CashFlow.objects.all()
    serializer_class = serializers.CashFlowSerializer
    filter_class = filters.CashFlowFilter
    ordering_fields = '__all__'
    ordering = ('-id',)
