from django.urls import path, include
from . import views
from .views import RoomViewSet, BoarderViewSet, PaymentViewSet, NotificationViewSet, CurrentBoarderViewSet, PayPalSuccessView, LogoutView
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

    path('paypal/success/', PayPalSuccessView.as_view(), name='paypal-success'),
    path('cash/request/', views.CashPaymentRequestView.as_view(), name='cash-request'), 
    path('logout/', LogoutView.as_view(), name='logout'),
]