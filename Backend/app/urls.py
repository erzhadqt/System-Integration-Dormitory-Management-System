from django.urls import path, include
from . import views
from .views import RoomViewSet, BoarderViewSet, PaymentViewSet, NotificationViewSet, CurrentBoarderViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register(r'rooms', RoomViewSet)
router.register(r'boarders', BoarderViewSet)
# router.register(r'staffs', StaffViewSet)
router.register(r'payment', PaymentViewSet)
router.register(r'notification', NotificationViewSet)
router.register(r'current-boarder', CurrentBoarderViewSet, basename='current-boarder')

urlpatterns = [
    path('', include(router.urls)),
]