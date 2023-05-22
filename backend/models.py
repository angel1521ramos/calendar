from django.db import models
from django.contrib import admin
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import User

# Create your models here.


class doctors(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=500)
    specialty = models.CharField(max_length=500)
    color = models.CharField(max_length=500)

    def __str__(self):
        return self.name + ', ' + self.color


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


admin.site.register(doctors)
admin.site.register(calendar)
