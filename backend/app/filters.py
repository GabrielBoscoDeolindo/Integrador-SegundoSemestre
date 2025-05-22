# import django_filters
# from .models import Sensor, Historico

# class SensorFilter(django_filters.FilterSet):
#     timestamp = django_filters.DateFilter(field_name='timestamp', lookup_expr='date')

#     class Meta:
#         model = Sensor
#         fields = {
#             'id': ['exact'],
#             'sensor': ['exact'],
#             'timestamp': ['exact'],
#         }

# class HistoricoFilter(django_filters.FilterSet):
#     class Meta:
#         model = Historico
#         fields = {
#             'id': ['exact'],
#             'sensor__id': ['exact'],
#             'sensor__sensor': ['exact'],
#             'sensor__timestamp': ['date'],
#             'ambiente__sig': ['exact'],
#         }
