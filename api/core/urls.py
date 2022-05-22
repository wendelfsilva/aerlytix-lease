from django.urls import path, include
from rest_framework.routers import DefaultRouter

from core import viewsets

router = DefaultRouter()
router.register(r'aircraft', viewset=viewsets.AircraftViewSet)
router.register(r'lease', viewset=viewsets.LeaseViewSet)
router.register(r'cash_flow', viewset=viewsets.CashFlowViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
