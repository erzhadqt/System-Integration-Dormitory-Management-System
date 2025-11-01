from django.shortcuts import render
from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework import viewsets
from .serializers import UserSerializer
from .models import Room
from .serializers import RoomSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser

# Create your views here.
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class RoomViewSet(viewsets.ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

