from django.shortcuts import render
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from django.contrib.auth.models import User
from rest_framework import generics, viewsets, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer, RoomSerializer, BoarderSerializer, PaymentSerializer, NotificationSerializer
from .models import Room, Boarder, Payment, Notification
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser

from google.oauth2 import id_token
from google.auth.transport import requests

from rest_framework_simplejwt.tokens import RefreshToken    

from rest_framework.decorators import action

from django.utils import timezone
from datetime import datetime

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
            # 1. Verify Google Token
            # (Assuming you have google.oauth2.id_token imported)
            request_adapter = requests.Request()
            id_info = id_token.verify_oauth2_token(token, request_adapter)
            
            email = id_info.get("email")
            given_name = id_info.get("given_name", "User")

            # 2. Check if User exists, or create one
            try:
                user = User.objects.get(email=email)
            except User.DoesNotExist:
                # CREATING USER TRIGGERS THE SIGNAL -> CREATES BOARDER
                user = User.objects.create_user(
                    username=email, # Use email as username for Google users
                    email=email,
                    first_name=given_name
                )
                # We do NOT create a Boarder here, because signals.py already did it!

            # 3. Generate JWT Tokens
            refresh = RefreshToken.for_user(user)
            
            # 4. Return Data
            return Response({
                "access": str(refresh.access_token),
                "refresh": str(refresh),
                "username": user.username,
                "given_name": user.first_name,
                "role": "boarder" # Assuming google login is for boarders
            }, status=status.HTTP_200_OK)

        except ValueError as e:
            return Response({"error": "Invalid Google Token"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print("Google Login Error:", e) # Check your terminal for this print if it fails
            return Response({"error": "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class CurrentBoarderViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    # --- HELPER: Safe Get Boarder ---
    def get_boarder(self, user):
        """
        Safely get the boarder profile. 
        If it doesn't exist (fixing the 404 error), create one automatically.
        """
        try:
            return Boarder.objects.get(user=user)
        except Boarder.DoesNotExist:
            # AUTO-FIX: Create the missing profile
            return Boarder.objects.create(
                user=user,
                username=user.username,
                email=user.email,
                contact_number="N/A",
                guardian_name="N/A",
                guardian_contact="N/A",
                gender="Male",
                address="N/A"
            )

    def list(self, request):
        boarder = self.get_boarder(request.user) # <--- Use helper to prevent 404

        # 2. Check if they have a room
        if not boarder.room:
            return Response({
                "username": boarder.username,
                "email": boarder.email,
                "room_number": "No Room Assigned",
                "room_price": 0,
                "payment_status": "No Room",
                "due_amount": 0,
                "due_date": None
            })

        # 3. Calculate Rent Amount
        rent_price = boarder.room.price
        
        # 4. Check for payments MADE THIS MONTH
        now = timezone.now()
        current_month_start = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        
        # Check for COMPLETED payments this month
        has_paid = Payment.objects.filter(
            boarder=boarder,
            status='Completed',
            date_paid__gte=current_month_start
        ).exists()

        # Check for PENDING (Cash) payments this month
        is_pending = Payment.objects.filter(
            boarder=boarder,
            status='Pending',
            date_paid__gte=current_month_start
        ).exists()

        # 5. Determine Status
        if has_paid:
            status = "Paid"
            balance = 0
        elif is_pending:
            status = "Pending"
            balance = rent_price 
        else:
            status = "Unpaid"
            balance = rent_price

        # 6. Return Data
        return Response({
            "id": boarder.id,
            "username": boarder.username,
            "email": boarder.email,
            "room_number": boarder.room.room_number,
            "room_price": rent_price,
            "payment_status": status,
            "due_amount": balance,
            "due_date": boarder.room.due_date,
            "guardian_contact": boarder.guardian_contact,
        })
        
    @action(detail=False, methods=['get', 'patch'])
    def history(self, request):
        # FIX FOR 500 ERROR
        boarder = self.get_boarder(request.user)

        if request.method == 'GET':
            # Get their payments (newest first)
            payments = Payment.objects.filter(boarder=boarder).order_by('-date_paid')
            
            # THE FIX: Serialize the PAYMENTS, not the Boarder Class
            serializer = PaymentSerializer(payments, many=True) 
            return Response(serializer.data)

        # (History usually doesn't need PATCH, but keeping structure if you intend to add logic)
        return Response({"error": "Method not allowed"}, status=405)

    @action(detail=False, methods=['get', 'patch'])
    def profile(self, request):
        # FIX FOR 404 ERROR
        boarder = self.get_boarder(request.user)

        if request.method == 'GET':
            serializer = BoarderSerializer(boarder)
            return Response(serializer.data)

        elif request.method == 'PATCH':
            # Partial update (only fields sent by frontend)
            serializer = BoarderSerializer(boarder, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=400)
        

class RoomViewSet(viewsets.ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    permission_classes = [IsAuthenticated]

    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    search_fields = ['room_number']
    filterset_fields = ['room_type']

class BoarderViewSet(viewsets.ModelViewSet):
    queryset = Boarder.objects.all()
    serializer_class = BoarderSerializer
    permission_classes = [IsAuthenticated]

# class StaffViewSet(viewsets.ModelViewSet):
#     queryset = Staff.objects.all()
#     serializer_class = StaffSerializer
#     permission_classes = [IsAuthenticated]

class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated]

class PayPalSuccessView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        amount = request.data.get('amount')
        transaction_id = request.data.get('transaction_id')

        try:
            # Get the logged-in boarder
            boarder = Boarder.objects.get(email=request.user.email)
            
            # Create the completed payment record
            Payment.objects.create(
                boarder=boarder,
                amount=amount,
                payment_method='PayPal',
                status='Completed',
                transaction_id=transaction_id
            )
            username = boarder.username
            return Response({"message": "Payment Recorded Successfully", 'username': username})
        except Boarder.DoesNotExist:
            return Response({"error": "Boarder not found"}, status=404)


class CashPaymentRequestView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        amount = request.data.get('amount')
        
        try:
            # 1. Get the current logged-in boarder
            boarder = Boarder.objects.get(email=request.user.email)
            
            # 2. Check if they already have a PENDING cash request (prevent spamming)
            existing_pending = Payment.objects.filter(
                boarder=boarder, 
                status='Pending', 
                payment_method='Cash'
            ).exists()

            if existing_pending:
                 return Response({"error": "You already have a pending cash payment. Please wait for the landlord to verify it."}, status=400)

            # 3. Create the Payment Record
            Payment.objects.create(
                boarder=boarder,
                amount=amount,
                payment_method='Cash',
                status='Pending',  # It stays Pending until you (Landlord) approve it in Admin Panel
                transaction_id="CASH_PROMISE"
            )
            return Response({"message": "Cash payment request submitted. Please pay the landlord."})
            
        except Boarder.DoesNotExist:
            return Response({"error": "Boarder profile not found."}, status=404)

class NotificationViewSet(viewsets.ModelViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            # In a stateless JWT setup, the token is simply discarded on the client side.
            # If you were using a blacklist app, you would add the token to the blacklist here.
            
            return Response({"message": "Successfully logged out"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": "Something went wrong"}, status=status.HTTP_400_BAD_REQUEST)