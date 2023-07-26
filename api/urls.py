from django.urls import path
from api import views


from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

app_name = 'api'
app_version='v1.5.0'


urlpatterns = [
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.RegisterView.as_view(), name='auth_register'),
    path('test/', views.testEndPoint, name='test'),
    path('docs/', views.DocsView.as_view(), name='docs'),
    path('teams/', views.TeamCreateAndListAPIView.as_view(), name='teams'),
    #path('team/<slug:slug>/', views.TeamCreateAndListAPIView, name='teams'),
    #path('team/<slug:slug>/projects/', views.ProjectCreateAndListAPIView, name='projects'),
    path('projects/', views.ProjectCreateAndListAPIView.as_view(), name='projects'),
    path('profile/', views.UserProfileAPIView.as_view(), name='profile'),
    #path to get project detail
    path('', views.getRoutes,name='routes')
]