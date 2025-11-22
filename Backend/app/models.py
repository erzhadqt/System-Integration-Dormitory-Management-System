from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
    
# ROOM
class Room(models.Model):
    room_number = models.CharField(max_length=10)
    
    room_type = models.CharField(max_length=20, choices={
        ('Single', 'Single'),
        ('Double', 'Double'),
        ('Bedspacers', 'Bedspacers')
    })
    status = models.CharField(max_length=20, choices=[
        ('Available', 'Available'),
        ('Full', 'Full'),
        ('Maintenance', 'Maintenance')
    ], default='Available')

    price = models.DecimalField(max_digits=6, decimal_places=2)
    due_date = models.DateField()

    image = models.ImageField(upload_to="product_images/", null=True, blank=True)

    def __str__(self):
        return f"Room {self.room_number}"
    
# BOARDER
class Boarder(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)

    room = models.ForeignKey(Room, on_delete=models.SET_NULL, null=True, blank=True, related_name='room')
    username = models.CharField(max_length=100, null=True, blank=True)
    email = models.EmailField(unique=True, blank=True)
    gender = models.CharField(max_length=10, choices=[
        ('Male', 'Male'),
        ('Female', 'Female')
    ])
    contact_number = models.CharField(max_length=20)
    address = models.TextField(blank=True)
    guardian_name = models.CharField(max_length=100)
    guardian_contact = models.CharField(max_length=20)

    def __str__(self):
        return self.username or self.email

#Payment
class Payment(models.Model):
    boarder = models.ForeignKey(Boarder, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date_paid = models.DateTimeField(auto_now_add=True)
    payment_method = models.CharField(max_length=20, choices=[
        ('GCash', 'GCash'),
        ('Cash', 'Cash')
    ])
    status = models.CharField(max_length=20, choices=[
        ('Pending', 'Pending'),
        ('Completed', 'Completed'),
        ('Failed', 'Failed')
    ], default='Pending')

    def __str__(self):
        return f"{self.boarder} - {self.amount}"

class Notification(models.Model):
    boarder = models.ForeignKey(Boarder, on_delete=models.CASCADE)
    subject = models.CharField(max_length=150)
    message = models.TextField()
    status = models.CharField(max_length=20, choices=[
        ('Pending', 'Pending'),
        ('Sent', 'Sent'),
        ('Failed', 'Failed')
    ], default='Pending')
    sent_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.subject
    
