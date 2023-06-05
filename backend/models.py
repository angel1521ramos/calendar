from django.db import models
from django.contrib import admin
from django.db.models.signals import post_migrate
from django.dispatch import receiver
from django.contrib.auth.models import User

# Create your models here.


class doctors(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=500)
    specialty = models.CharField(max_length=500)
    color = models.CharField(max_length=500)

    def __str__(self):
        return self.name + ', ' + self.color


class banner(models.Model):
    color = models.CharField(max_length=100)
    message = models.CharField(
        max_length=1000)
    activate = models.BooleanField()

    def __str__(self):
        return self.color + ', ' + self.message

class calendar(models.Model):
    patient = models.CharField(max_length=500)
    age = models.CharField(max_length=100)
    phone = models.CharField(max_length=500)
    education = models.CharField(max_length=500)
    observations = models.CharField(max_length=1000)
    doctor = models.CharField(max_length=500)
    color = models.CharField(max_length=500)
    day = models.IntegerField()
    date = models.CharField(max_length=500)

    def __str__(self):
        return self.patient + ', ' + self.doctor


@receiver(post_migrate)
def initial_registration(sender, **kwargs):
    if sender.name == 'backend':
        message = banner(
            color='orange', message='Edita este mensaje, añade un color de fondo y activalo para mostrarlo al inicio de sesion de todos los usuarios', activate=False)
        message.save()


admin.site.register(banner)
admin.site.register(doctors)
admin.site.register(calendar)
