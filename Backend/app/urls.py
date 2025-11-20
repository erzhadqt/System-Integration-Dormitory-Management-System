from django.urls import path, include
from . import views
from .views import RoomViewSet, BoarderViewSet, StaffViewSet, PaymentViewSet, NotificationViewSet, RoomListCreate
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register(r'rooms', RoomViewSet)
router.register(r'boarders', BoarderViewSet)
router.register(r'staffs', StaffViewSet)
router.register(r'payment', PaymentViewSet)
router.register(r'notification', NotificationViewSet)

urlpatterns = [
    # path('products/', views.ProductListCreate.as_view(), name='product-list'),
    # path('product/delete/<int:pk>/', views.ProductDelete.as_view(), name='delete-product'),
    path('', include(router.urls)),

    path('rooms/', views.RoomListCreate.as_view(), name='room-list'),
    path('room/delete/<int:pk>/', views.RoomDelete.as_view(), name='delete-room'),
]