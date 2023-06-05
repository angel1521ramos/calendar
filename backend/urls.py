from django.urls import path, include
from django.contrib import admin
from rest_framework_simplejwt import views as jwt_views
from rest_framework.authtoken.views import obtain_auth_token
from . import views

urlpatterns = [
    path('get/doctors/', views.getDoctors),
    ##################################################################################################
    path('get/users/', views.getUsers),
    ##################################################################################################
    path('get/<int:pk>/banners/', views.getBanner),
    path('put/<int:pk>/banners/', views.putBanner),
    ##################################################################################################
    path('get/', views.getCalendar),
    path('post/', views.postCalendar),
    path('put/<int:pk>/', views.putCalendar),
    path('delete/<int:pk>/', views.deleteCalendar),
    ##################################################################################################
    path('token/', jwt_views.TokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('home/', views.HomeView.as_view(), name='home'),
    path('logout/', views.LogoutView.as_view(), name='logout'),
]
