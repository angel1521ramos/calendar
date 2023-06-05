from rest_framework.serializers import ModelSerializer
from .models import calendar, doctors, banner
from django.contrib.auth.models import User


class usersSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class doctorsSerializer(ModelSerializer):
    class Meta:
        model = doctors
        fields = '__all__'


class calendarSerializer(ModelSerializer):
    class Meta:
        model = calendar
        fields = '__all__'


class bannerSerializer(ModelSerializer):
    class Meta:
        model = banner
        fields = '__all__'
