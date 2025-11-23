from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Room, Boarder, Payment, Notification

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "password", "is_staff", "is_superuser"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        # Use create_user to ensure password hashing for standard User creation
        user = User.objects.create_user(**validated_data)
        return user

class BoarderSerializer(serializers.ModelSerializer):
    room_number = serializers.CharField(source='room.room_number', read_only=True)
    room_price = serializers.DecimalField(source='room.price', max_digits=10, decimal_places=2, read_only=True)
    password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = Boarder
        fields = '__all__'
        extra_kwargs = {
            'user': {'read_only': True} 
        }

    def create(self, validated_data):
        # (Keep your create logic exactly the same...)
        password = validated_data.pop('password', 'defaultPass123') 
        user = User.objects.create_user(
            username=validated_data.get('username'), 
            email=validated_data.get('email'), 
            password=password
        )

        # 4. Get the Boarder profile that was JUST created by the signal
        # We DO NOT create a new one, we fetch the one the signal made.
        boarder = Boarder.objects.get(user=user)

        # 5. Update the existing profile with the rest of the form data
        for attr, value in validated_data.items():
            setattr(boarder, attr, value)
        
        boarder.save()
        
        return boarder
    
    def update(self, instance, validated_data):
        # 1. Update User Login Info (if email/username/password changed)
        user = instance.user
        if 'email' in validated_data:
            user.email = validated_data['email']
        if 'username' in validated_data:
            user.username = validated_data['username']
        
        # Handle Password Change safely
        password = validated_data.pop('password', None)
        if password:
            user.set_password(password)
        
        user.save()

        # 2. Update Boarder Profile Info
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        
        instance.save()
        return instance

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
        
