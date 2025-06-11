from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Sensor, Ambiente, Historico

# -------------- Serializer de Sensores ----------------
class SensorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sensor
        fields = '__all__'

# -------------- Serializer de Ambientes ----------------
class AmbienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ambiente
        fields = '__all__'

# -------------- Serializer de Historico ----------------
class HistoricoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Historico
        fields = '__all__'

# --------- Serializer de Registro de Usuário ------------
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password']
        )
        return user
