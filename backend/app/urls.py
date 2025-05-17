from django.urls import path
from .views import *
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    # prof
    # path('sensor/', ProfessorListCreateView.as_view(), name='professor-list-create'),
]