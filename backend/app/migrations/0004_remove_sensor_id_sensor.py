# Generated by Django 5.2 on 2025-05-24 17:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0003_sensor_id_sensor'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='sensor',
            name='id_sensor',
        ),
    ]
