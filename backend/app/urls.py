from django.urls import path
from .views import *
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    # path('sensor/', ProfessorListCreateView.as_view(), name='professor-list-create'),
]