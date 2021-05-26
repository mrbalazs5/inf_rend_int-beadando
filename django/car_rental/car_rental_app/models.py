from django.db import models
from django.contrib.auth.models import User


class File(models.Model):
    file = models.ImageField(blank=False, null=False)
    def __str__(self):
        return self.file.name

class Car(models.Model):
    class Status(models.IntegerChoices):
        FREE = 0
        RENTED = 1
    createdAt = models.DateTimeField(auto_now_add=True)
    type = models.TextField()
    rentPrice = models.IntegerField()
    status = models.IntegerField(choices=Status.choices, default=Status.FREE)
    rentalCustomer = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)
    image = models.ForeignKey(File, null=True, on_delete=models.SET_NULL)

    class Meta:
        ordering = ['createdAt']