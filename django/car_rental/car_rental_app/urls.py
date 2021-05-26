from django.urls import path
from car_rental.car_rental_app import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('registration/', views.postCreateUserAction),
    path('get-cars/', views.getCarsAction),
    path('get-car/<int:id>/', views.getCarAction),
    path('create-car/', views.postCreateCarAction),
    path('rent-car/<int:id>/', views.patchRentCarAction),
    path('free-car/<int:id>/', views.patchFreeCarAction),
    path('delete-car/<int:id>/', views.deleteRemoveCarAction)
]

if settings.DEBUG:
  urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)