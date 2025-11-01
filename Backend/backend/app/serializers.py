from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Dormitory, Room, Boarder, Staff, Payment, Notification

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.object.create_user(**validated_data)
        return user

class DormitorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Dormitory
        fields = '__all__'
        extra_kwargs = {'name': {'read_only': True},
                        'location': {'read_only': True},
                        'gender_allowed': {'read_only': True}}

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = '__all__'
        extra_kwargs = {'dormitory': {'read_only': True},
                        'room_number': {'read_only': True},
                        'capacity': {'read_only': True},
                        'room_type': {'read_only': True},
                        'status': {'read_only': True}}
        
class BoarderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Boarder
        fields = '__all__'
        extra_kwargs = {'room': {'read_only': True},
                        'first_name': {'read_only': True},
                        'last_name': {'read_only': True},
                        'gender': {'read_only': True},
                        'contact_number': {'read_only': True},
                        'email': {'read_only': True},
                        'address': {'read_only': True},
                        'guardian_name': {'read_only': True},
                        'guardian_contact': {'read_only': True}}

class StaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = Staff
        fields = '__all__'
        extra_kwargs = {'dormitory': {'read_only': True},
                        'first_name': {'read_only': True},
                        'last_name': {'read_only': True},
                        'position': {'read_only': True},
                        'contact_number': {'read_only': True},
                        'email': {'read_only': True}}

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'
        extra_kwargs = {'boarder': {'read_only': True},
                        'amount': {'read_only': True},
                        'date_paid': {'read_only': True},
                        'payment_method': {'read_only': True},
                        'status': {'read_only': True}}
        
class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'
        extra_kwargs = {'boarder': {'read_only': True},
                        'subject': {'read_only': True},
                        'message': {'read_only': True},
                        'status': {'read_only': True},
                        'sent_at': {'read_only': True}}
        
