from rest_framework import serializers
from car_rental.car_rental_app.models import Car
from django.contrib.auth.models import User
from car_rental.car_rental_app.models import File


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'password', 'is_superuser']

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
        )

        user.set_password(validated_data['password'])
        user.save()

        return user

class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = "__all__"

class CarSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField('get_image_url')

    def get_image_url(self, obj):
        if not obj.image:
            return None
        request = self.context['request']
        return f"{request.scheme}://{request.get_host()}{obj.image.file.url}"

    class Meta:
        model = Car
        fields = ['id', 'type', 'rentPrice', 'status', 'rentalCustomer', 'image', 'image_url']
        read_only_fields = ['image_url']
        extra_kwargs = {
            'image': {'write_only': True}
        }