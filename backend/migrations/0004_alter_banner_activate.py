# Generated by Django 4.2 on 2023-05-26 04:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0003_alter_banner_activate'),
    ]

    operations = [
        migrations.AlterField(
            model_name='banner',
            name='activate',
            field=models.BooleanField(),
        ),
    ]
