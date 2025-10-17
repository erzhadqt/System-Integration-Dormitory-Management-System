from django.db import models

# DORMITORY
class Dormitory(models.Model):
    name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    gender_allowed = models.CharField(max_length=10, choices=[
        ('Male', 'Male'),
        ('Female', 'Female'),
    ])

    def __str__(self):
        return self.name
    
# ROOM
class Room(models.Model):
    dormitory = models.ForeignKey(Dormitory, on_delete=models.CASCADE)
    room_number = models.CharField(max_length=10)
    capacity = models.PositiveBigIntegerField()
    
    room_type = models.CharField(max_length=20, choices={
        ('Single', 'Single')
        ('Double', 'Double')
        ('Bedspacers', 'Bedspacers')
    })
    status = models.CharField(max_length=20, choices=[
        ('Available', 'Available')
        ('Full', 'Full')
        ('Maintenance', 'Maintenance')
    ], default='Available')

    def __str__(self):
        return f"Room {self.room_number} - {self.dormitory.name}"
    
# BOARDER
class Boarder(models.Model):
    room = models.ForeignKey(Room, on_delete=models.SET_NULL, null=True, blank=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    gender = models.CharField(max_length=10, choices=[
        ('Male', 'Male')
        ('Female', 'Female')
    ])
    contact_number = models.CharField(max_length=20)
    email = models.EmailField(unique=True)
    address = models.TextField(blank=True)
    guardian_name = models.CharField(max_length=100)
    guardian_contact = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
    
# STAFF
class Staff(models.Model):
    dormitory = models.ForeignKey(Dormitory, on_delete=models.SET_NULL, null=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    position = models.CharField(max_length=50)
    contact_number = models.CharField(max_length=50)
    email = models.EmailField(unique=True)

    def __str__(self):
        return f"{self.first_name} {self.first_name}"
    
#Payment
class Payment(models.Model):
    boarder = models.ForeignKey(Boarder, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date_paid = models.DateTimeField(auto_now_add=True)
    payment_method = models.CharField(max_length=20, choices=[
        ('GCash', 'GCash')
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
    
