from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import Boarder

@receiver(post_save, sender=User)
def create_boarder_profile(sender, instance, created, **kwargs):
    if created:
        if not Boarder.objects.filter(user=instance).exists():
            Boarder.objects.create(
                user=instance,
                username=instance.username,
                email=instance.email,
                # WE MUST PROVIDE DEFAULTS FOR REQUIRED FIELDS TO PREVENT 500 ERROR
                contact_number="N/A",
                guardian_name="N/A",
                guardian_contact="N/A",
                gender="Male", # Or 'Male'/'Female' as default
                address="N/A"
            )