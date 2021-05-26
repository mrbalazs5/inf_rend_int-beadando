from functools import partial
from car_rental.car_rental_app.models import Car
from car_rental.car_rental_app.serializers import CarSerializer, FileSerializer
from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import JSONParser
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from car_rental.car_rental_app.serializers import UserSerializer


@api_view(['POST'])
@permission_classes([IsAuthenticated])
@csrf_exempt
def postCreateUserAction(request):
    data = JSONParser().parse(request)

    userSerializer = UserSerializer(data=data)

    if userSerializer.is_valid():
        userSerializer.save()
        return JsonResponse(userSerializer.data, status=201)
    return JsonResponse(userSerializer.errors, status=400)

@api_view(['GET'])
@permission_classes([AllowAny])
@authentication_classes([])
@csrf_exempt
def getCarsAction(request):
    cars = Car.objects.all()
    carSerializer = CarSerializer(cars, many=True, context={'request': request})

    return JsonResponse(carSerializer.data, safe=False)

@api_view(['GET'])
@permission_classes([AllowAny])
@authentication_classes([])
@csrf_exempt
def getCarAction(request, id):
    try:
        car = Car.objects.get(pk=id)
    except Car.DoesNotExist:
        return HttpResponse(status=404)

    carSerializer = CarSerializer(car, context={'request': request})
    return JsonResponse(carSerializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@csrf_exempt
def postCreateCarAction(request):
    data = request.data

    file = data.get("image")
    fileSerializer = FileSerializer(data={"file": file}, partial=True)

    if not fileSerializer.is_valid():
        return HttpResponse(status=400)

    image = fileSerializer.save()

    carSerializer = CarSerializer(
        data={
            'type': data.get('type'),
            'rentPrice': data.get('rentPrice'),
            'image': image.id
        },
        partial=True,
        context={'request': request}
    )

    if not carSerializer.is_valid():
        return JsonResponse(carSerializer.errors, status=400)

    carSerializer.save()

    return JsonResponse(carSerializer.data, status=201)

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
@csrf_exempt
def patchRentCarAction(request, id):
    try:
        car = Car.objects.get(pk=id)
    except Car.DoesNotExist:
        return HttpResponse(status=404)

    data = JSONParser().parse(request)

    rentalCustomer = data.get("rentalCustomer")

    carSerializer = CarSerializer(
        car,
        data={
            "status": Car.Status.RENTED,
            "rentalCustomer": rentalCustomer
        },
        partial=True,
        context={'request': request}
    )

    if carSerializer.is_valid():
        carSerializer.save()
        return JsonResponse(carSerializer.data, status=200)
    return JsonResponse(carSerializer.errors, status=400)

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
@csrf_exempt
def patchFreeCarAction(request, id):
    try:
        car = Car.objects.get(pk=id)
    except Car.DoesNotExist:
        return HttpResponse(status=404)

    data = JSONParser().parse(request)

    if car.rentalCustomer.id != data.get('rentalCustomer'):
        return JsonResponse(
            ["You don't have permission to free this car."],
            status=400,
            safe=False
        )

    carSerializer = CarSerializer(
        car,
        data={
            "status": Car.Status.FREE,
        },
        partial=True,
        context={'request': request}
    )

    if carSerializer.is_valid():
        carSerializer.save()
        return JsonResponse(carSerializer.data, status=200)
    return JsonResponse(carSerializer.errors, status=400)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
@csrf_exempt
def deleteRemoveCarAction(request):
    try:
        car = Car.objects.get(pk=id)
    except Car.DoesNotExist:
        return HttpResponse(status=404)

    car.delete()

    return HttpResponse(status=204)


