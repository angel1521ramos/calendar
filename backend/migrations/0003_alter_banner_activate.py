# Generated by Django 4.2 on 2023-05-26 04:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0002_alter_banner_activate_alter_banner_color_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='banner',
            name='activate',
            field=models.IntegerField(),
        ),
    ]