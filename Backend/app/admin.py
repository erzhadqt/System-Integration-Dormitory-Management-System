from django.contrib import admin
from .models import Room, Boarder, Payment, Notification

# Register your models here.
admin.site.register(Room)
admin.site.register(Boarder)
# admin.site.register(Staff)
admin.site.register(Payment)
admin.site.register(Notification)