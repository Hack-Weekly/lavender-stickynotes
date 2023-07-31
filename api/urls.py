from django.urls import path
from api import views


from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

app_name = 'api'



urlpatterns = [
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.RegisterView.as_view(), name='auth_register'),
    path('test/', views.testEndPoint, name='test'),
    path('docs/', views.DocsView.as_view(), name='docs'),
    path('teams/', views.TeamCreateAndListAPIView.as_view(), name='teams'),
    path('team/<slug:slug>/',views.TeamDetailView.as_view(), name='team_detail'),
    path('team/<slug:slug>/add/',views.AddTeamMemberAPIView.as_view(), name='team_add_member'),
    path('team/<slug:slug>/project/<int:pk>/', views.ProjectDetailView.as_view(), name='project_detail'),
    path('team/<slug:slug>/project/<int:pk>/task/', views.TaskAPIView.as_view(), name='task'),
    path('team/<slug:slug>/project/<int:pk>/note/', views.NoteAPIView.as_view(), name='note'),
    #path('projects/', views.ProjectCreateAndListAPIView.as_view(), name='projects'), #not need
    path('profile/', views.UserProfileAPIView.as_view(), name='profile'),
    #path('inbox',)
    
    #path to get project detail
    path('', views.getRoutes,name='routes')
]