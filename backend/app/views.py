from rest_framework import generics
from .models import Sensor, Ambiente, Historico
from .serializers import SensorSerializer, AmbienteSerializer, HistoricoSerializer, RegisterSerializer
from django.shortcuts import render, redirect
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .permissions import Gestor
from rest_framework_simplejwt.views import TokenObtainPairView


# -------------------------- SENSOR ---------------
class SensorListCreateView(generics.ListCreateAPIView):
    queryset = Sensor.objects.all()
    serializer_class = SensorSerializer
    def get_permissions(self):
        if self.request.method == 'POST':
            return [Gestor()]
        return [IsAuthenticatedOrReadOnly()]

class SensorDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Sensor.objects.all()
    serializer_class = SensorSerializer
    def get_permissions(self):
        if self.request.method in ['PUT', 'PATCH', 'DELETE']:
            return [Gestor()]
        return [IsAuthenticatedOrReadOnly()]


# -------------------- AMBIENTE ------------------
class AmbienteListCreateView(generics.ListCreateAPIView):
    queryset = Ambiente.objects.all()
    serializer_class = AmbienteSerializer
    def get_permissions(self):
        if self.request.method == 'POST':
            return [Gestor()]
        return [IsAuthenticatedOrReadOnly()]

class AmbienteDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Ambiente.objects.all()
    serializer_class = AmbienteSerializer
    def get_permissions(self):
        if self.request.method in ['PUT', 'PATCH', 'DELETE']:
            return [Gestor()]
        return [IsAuthenticatedOrReadOnly()]


# ------------------------ HISTÓRICO -------------------
class HistoricoListCreateView(generics.ListCreateAPIView):
    queryset = Historico.objects.all()
    serializer_class = HistoricoSerializer
    def get_permissions(self):
        if self.request.method == 'POST':
            return [Gestor()]
        return [IsAuthenticatedOrReadOnly()]

class HistoricoDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Historico.objects.all()
    serializer_class = HistoricoSerializer
    def get_permissions(self):
        if self.request.method in ['PUT', 'PATCH', 'DELETE']:
            return [Gestor()]
        return [IsAuthenticatedOrReadOnly()]
    
# --------------------- USUARIO -------------------------
class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = []  




