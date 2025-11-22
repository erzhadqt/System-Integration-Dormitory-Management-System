from django.apps import AppConfig
from django.apps import AppConfig

class AppConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'app'

class AppConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'app' # Make sure this matches your actual app folder name

    def ready(self):
        import app.signals # Import the signals we just made