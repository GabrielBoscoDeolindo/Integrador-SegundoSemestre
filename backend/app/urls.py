from django.urls import path
from .views import *
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    
    path('sensores/', SensorListCreateView.as_view(), name='sensores'),
    path('sensores/<int:pk>/', SensorDetailView.as_view(), name='sensor-detail'),
    
    path('ambientes/', AmbienteListCreateView.as_view(), name='ambientes'),
    path('ambientes/<int:pk>/', AmbienteDetailView.as_view(), name='ambiente-detail'),
    
    path('historico/', HistoricoListCreateView.as_view(), name='historico'),
    path('historico/<int:pk>/', HistoricoDetailView.as_view(), name='historico-detail'),

    path('exportar-sensor', ExportarSensor.as_view(), name='exportar-excel-sensores'),
    path('exportar-ambiente', ExportarAmbiente.as_view(), name='exportar-excel-sensores-ambiente'),
    path('exportar-historico', ExportarHistorico.as_view(), name='exportar-excel-sensores-historico'),
]