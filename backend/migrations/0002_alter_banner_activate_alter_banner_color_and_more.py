# Generated by Django 4.2 on 2023-05-26 03:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='banner',
            name='activate',
            field=models.BooleanField(),
        ),
        migrations.AlterField(
            model_name='banner',
            name='color',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='banner',
            name='message',
            field=models.CharField(max_length=1000),
        ),
    ]
