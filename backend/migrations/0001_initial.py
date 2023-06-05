# Generated by Django 4.2 on 2023-05-26 03:43

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='banner',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('color', models.CharField(default='orange', max_length=100)),
                ('message', models.CharField(default='Edita este mensaje, añade un color de fondo y activalo para mostrarlo al inicio de sesion de todos los usuarios', max_length=1000)),
                ('activate', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='calendar',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('patient', models.CharField(max_length=500)),
                ('age', models.CharField(max_length=100)),
                ('phone', models.CharField(max_length=500)),
                ('education', models.CharField(max_length=500)),
                ('observations', models.CharField(max_length=1000)),
                ('doctor', models.CharField(max_length=500)),
                ('color', models.CharField(max_length=500)),
                ('day', models.IntegerField()),
                ('date', models.CharField(max_length=500)),
            ],
        ),
        migrations.CreateModel(
            name='doctors',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=500)),
                ('specialty', models.CharField(max_length=500)),
                ('color', models.CharField(max_length=500)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
