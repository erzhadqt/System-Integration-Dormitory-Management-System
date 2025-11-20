from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics, viewsets, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer, RoomSerializer, BoarderSerializer, StaffSerializer, PaymentSerializer, NotificationSerializer

from .models import Room, Boarder, Staff, Payment, Notification
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser

from google.oauth2 import id_token
from google.auth.transport import requests

from rest_framework_simplejwt.tokens import RefreshToken

# Create your views here.
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class GetUserView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

class GoogleAuth(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        token = request.data.get("token")

        if not token:
            return Response({"error": "Token missing"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Verify Google Token
            idinfo = id_token.verify_oauth2_token(token, requests.Request())

            google_email = idinfo["email"]
            given_name = idinfo.get("given_name", "")
            google_id = idinfo["sub"]  # unique google id

        except ValueError:
            return Response({"error": "Invalid Google token"}, status=status.HTTP_400_BAD_REQUEST)

        # Create or Get User
        user, created = User.objects.get_or_create(
            username=google_email,
            defaults={"email": google_email, "first_name": given_name},
        )

        # Generate Django Tokens (JWT)
        refresh = RefreshToken.for_user(user)

        return Response({
            "message": "Login successful",
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "username": user.username,
            "email": user.email,
            "given_name": user.first_name,
        })
        


class RoomListCreate(generics.ListCreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    permission_classes = [IsAdminUser]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class RoomDelete(generics.DestroyAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    permission_classes = [IsAdminUser]

    def perform_create(self, serializer):
        serializer.delete(author=self.request.user)

class RoomViewSet(viewsets.ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    permission_classes = [IsAuthenticated]

class BoarderViewSet(viewsets.ModelViewSet):
    queryset = Boarder.objects.all()
    serializer_class = BoarderSerializer
    permission_classes = [IsAuthenticated]

class StaffViewSet(viewsets.ModelViewSet):
    queryset = Staff.objects.all()
    serializer_class = StaffSerializer
    permission_classes = [IsAuthenticated]

class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated]

class NotificationViewSet(viewsets.ModelViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]