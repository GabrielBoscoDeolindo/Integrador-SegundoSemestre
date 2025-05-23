import django_filters
from .models import Sensor, Historico, Ambiente

class SensorFilter(django_filters.FilterSet):
    class Meta:
        model = Sensor
        fields = ['sensor', 'status', 'mac_address', 'unidade_med']

class AmbienteFilter(django_filters.FilterSet):
    class Meta:
        model = Ambiente
        fields = ['sig', 'descricao', 'ni', 'responsavel']

class HistoricoFilter(django_filters.FilterSet):
    class Meta:
        model = Historico
        fields = ['sensor', 'ambiente', 'timestamp', 'valor']
