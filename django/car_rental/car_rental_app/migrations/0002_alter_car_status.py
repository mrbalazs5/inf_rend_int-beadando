# Generated by Django 3.2.3 on 2021-05-22 09:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('car_rental_app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='car',
            name='status',
            field=models.IntegerField(choices=[(0, 'Free'), (1, 'Rented')], default=0),
        ),
    ]
