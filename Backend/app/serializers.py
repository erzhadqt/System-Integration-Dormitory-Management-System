from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Room, Boarder, Payment, Notification

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # Add "is_staff" and "is_superuser" to the fields list
        fields = ["id", "username", "email", "password", "is_staff", "is_superuser"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class BoarderSerializer(serializers.ModelSerializer):
    room_number = serializers.CharField(source='room.room_number', read_only=True)
    password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = Boarder
        fields = '__all__'

    def create(self, validated_data):
        # 1. Extract password
        password = validated_data.pop('password', 'defaultPass123') 
        
        # 2. Create the User
        # WARNING: This specific line triggers the Signal in signals.py!
        # The signal will immediately create a Boarder with "N/A" values.
        user = User.objects.create_user(
            username=validated_data.get('username'), 
            email=validated_data.get('email'), 
            password=password
        )

        # 3. Get the Boarder that the signal just created
        boarder = Boarder.objects.get(user=user)

        # 4. Update that existing Boarder with the real form data
        for attr, value in validated_data.items():
            setattr(boarder, attr, value)
        
        boarder.save()
        
        return boarder

class RoomSerializer(serializers.ModelSerializer):
    boarders = BoarderSerializer(many=True, read_only=True, source='boarder_set')

    class Meta:
        model = Room
        fields = '__all__'

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'
        
class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'
        # extra_kwargs = {'boarder': {'read_only': True},
        #                 'subject': {'read_only': True},
        #                 'message': {'read_only': True},
        #                 'status': {'read_only': True},
        #                 'sent_at': {'read_only': True}}
        
