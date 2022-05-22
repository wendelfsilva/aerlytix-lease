from rest_framework import serializers
from core import models


class SerializerBase(serializers.HyperlinkedModelSerializer):

    def get_field_names(self, declared_fields, info):
        _fields = super(SerializerBase, self).get_field_names(
            declared_fields=declared_fields,
            info=info
        )
        _fields.insert(0, 'id')
        return _fields


class AircraftSerializer(SerializerBase):

    class Meta:
        model = models.Aircraft
        fields = '__all__'


class LeaseSerializer(SerializerBase):

    aircraft_obj = AircraftSerializer(source='aircraft', read_only=True)

    class Meta:
        model = models.Lease
        fields = '__all__'


class CashFlowSerializer(SerializerBase):

    class Meta:
        model = models.CashFlow
        fields = '__all__'
