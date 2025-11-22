from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Room, Boarder, Payment, Notification

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class BoarderSerializer(serializers.ModelSerializer):
    room_number = serializers.CharField(source='room.room_number', read_only=True)
    class Meta:
        model = Boarder
        fields = '__all__'

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
        
