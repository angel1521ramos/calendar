
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status

from .models import calendar, doctors, banner
from django.contrib.auth.models import User
from .serializers import calendarSerializer, doctorsSerializer, usersSerializer, bannerSerializer
from django.shortcuts import render

# Create your views here.


class HomeView(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request):
        content = {'message': request.user.username}
        return Response(content, status=status.HTTP_200_OK)


class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getUsers(request):
    user = User.objects.all()
    serializer = usersSerializer(user, many=True)
    return Response(serializer.data)

##########################################################################################


@api_view(['GET'])
def getDoctors(request):
    doctor = doctors.objects.all()
    serializer = doctorsSerializer(doctor, many=True)
    return Response(serializer.data)

##########################################################################################


@api_view(['GET'])
def getBanner(request, pk):
    Banner = banner.objects.get(
        id=pk
    )
    serializer = bannerSerializer(instance=Banner)
    return Response(serializer.data)


@api_view(['PUT'])
def putBanner(request, pk):
    data = request.data
    Banner = banner.objects.get(
        id=pk
    )
    serializer = bannerSerializer(instance=Banner, data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

##########################################################################################


@api_view(['GET'])
def getCalendar(request):
    calendario = calendar.objects.all()
    serializer = calendarSerializer(calendario, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def postCalendar(request):
    data = request.data
    calendario = calendar.objects.create(
        patient=data['patient'],
        age=data['age'],
        phone=data['phone'],
        education=data['education'],
        observations=data['observations'],
        doctor=data['doctor'],
        color=data['color'],
        day=data['day'],
        date=data['date'],
    )
    serializer = calendarSerializer(calendario, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
def putCalendar(request, pk):
    data = request.data
    calendario = calendar.objects.get(
        id=pk
    )
    serializer = calendarSerializer(instance=calendario, data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)


@api_view(['DELETE'])
def deleteCalendar(request, pk):
    calendario = calendar.objects.get(
        id=pk
    )
    calendario.delete()
    return Response('Post eliminado')
