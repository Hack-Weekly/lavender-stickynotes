import json
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse,Http404
from api.serializers import MyTokenObtainPairSerializer, RegisterSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from django.contrib.auth import get_user_model
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from django.views.generic import TemplateView

#3rd party imports
from ipware import get_client_ip


#project imports
from api.version import version as api_version
from api.models import Team, Project
from api.serializers import TeamSerializer, ProjectSerializer,UserSerializer,ProjectOperationSerializer
from api.permissions import IsMember, IsOwner
#from api.urls import urlpatterns


User=get_user_model()


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

#api docs
class DocsView(TemplateView):
    template_name = 'api/docs.html'
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["api_version"] = api_version
        return context
    
#this will return all the routes available in the api
@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/',
        '/api/token/',
        '/api/register/',
        '/api/token/refresh/',
        '/api/test/',
        '/api/docs/',
        '/api/teams/',
        '/api/projects/',
        '/api/profile/',
    ]
    # for urls in urlpatterns:
    #     routes.append(urls.pattern._route)

    return Response(routes)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def testEndPoint(request):
    if request.method == 'GET':
        data = f"Congratulation {request.user}, your API just responded to GET request"
        return Response({'response': data}, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        try:
            body = request.body.decode('utf-8')
            data = json.loads(body)
            if 'text' not in data:
                return Response("Invalid JSON data", status.HTTP_400_BAD_REQUEST)
            text = data.get('text')
            data = f'Congratulation your API just responded to POST request with text: {text}'
            return Response({'response': data}, status=status.HTTP_200_OK)
        except json.JSONDecodeError:
            return Response("Invalid JSON data", status.HTTP_400_BAD_REQUEST)
    return Response("Invalid JSON data", status.HTTP_400_BAD_REQUEST)


class TeamCreateAndListAPIView(APIView):
    '''
    Get query can only be allowed to user with member or owner level permission.
    Post can be done by anyone.
    '''
    permission_classes = []

    def get(self,request,format=None):
        
        permission_classes = [IsAuthenticated]
        
        team_own=Team.objects.filter(owner=request.user)
        team_member=Team.objects.filter(members=request.user)

        serializer_own=TeamSerializer(team_own,many=True)
        serializer_member=TeamSerializer(team_member,many=True)

        return Response(
                        {'own':serializer_own.data,
                         'member':serializer_member.data,
                        })

    def post(self, request, format=None):
        serializer = TeamSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(owner=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProjectCreateAndListAPIView(APIView):
    '''
    This class can be accessed with anyone with member level permission.
    '''
    permission_classes = [IsAuthenticated]

    def get (self,request,format=None):
        project_own=Project.objects.filter(team__owner=request.user)
        project_member=Project.objects.filter(team__members=request.user)

        serializer_own=ProjectSerializer(project_own,many=True)
        serializer_member=ProjectSerializer(project_member,many=True)

        return Response(
                        {'own_project':serializer_own.data,
                         'member_project':serializer_member.data,
                        })
    
    #Handle creation of project, Team is required
    #user need to pass the name of team in team field
    def post(self, request,slug, format=None):
        try:
            team=Team.objects.get(slug=slug)
        except Team.DoesNotExist:
            return Response("Team doesn't exist",status=status.HTTP_400_BAD_REQUEST)
        if IsOwner(request,team).has_permission or IsMember(request,team).has_permission:
            serializer = ProjectSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response("You don't have permission to create project in this team",
                        status=status.HTTP_400_BAD_REQUEST)


class TeamDetailView(APIView):
    '''
    Every team has a unique slug, this slug is used to get the team detail.
    This whole class will need authentication+ access permission.
    Other user(member) can only access get method. all other function require
    owner permission.
    '''

    def get_object(self, slug):
        #Object permission will be defined here

        try:
            team=Team.objects.get(slug=slug)
            if IsOwner(self.request,team).has_permission or IsMember(self.request,team).has_permission:
                return team
            raise Http404
        except Team.DoesNotExist:
            raise Http404
    
    #this 'get' will return the team detail
    # It will also include members and  all project owned by this team.
    def get(self, request, slug, format=None):
        team = self.get_object(slug)
        serializer_projects=ProjectSerializer(team.project_team.all(),many=True)
        serializer_team = TeamSerializer(team)
        return Response({'team':serializer_team.data,
                        'projects':serializer_projects.data}
                        ,status=status.HTTP_200_OK)

    
    def put(self, request, slug, format=None):
        team = self.get_object(slug=slug)
        serializer = TeamSerializer(team, data=request.data)
        #read serializer update function for more info
        if serializer.is_valid():
            serializer.save(owner=request.user)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request,slug, format=None):
        try:
            team=Team.objects.get(slug=slug)
        except Team.DoesNotExist:
            return Response("Team doesn't exist",status=status.HTTP_400_BAD_REQUEST)
        if IsOwner(request,team).has_permission or IsMember(request,team).has_permission:
            serializer = ProjectOperationSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(team=team)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response("You don't have permission to create project in this team",
                        status=status.HTTP_400_BAD_REQUEST)
    
    
    def delete(self, request, slug, format=None):
        team = self.get_object(slug=slug)
        team.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

class ProjectDetailView(APIView):
    '''
    All method except delete can be accessed by any member of team..
    '''
    
    def get_object(self, slug):
        try:
            project= Project.objects.get(slug=slug)
            #get the team of ptoject
            team=project.team
            if IsOwner(self.request,team).has_permission or IsMember(self.request,team).has_permission:
                return project
            raise Http404
        except Project.DoesNotExist:
            raise Http404
    
    #get  query need to return  notes and tasks of entire project
    def get(self, request, slug, format=None):
        project = self.get_object(slug)
        serializer = ProjectSerializer(project)
        return Response(serializer.data)

    def put(self, request, slug, format=None):
        project = self.get_object(slug=slug)
        serializer = ProjectSerializer(project, data=request.data)
        if serializer.is_valid():
            serializer.save(owner=request.user)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, slug, format=None):
        project = self.get_object(slug=slug)
        project.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class UserProfileAPIView(APIView):
    '''
    This class will return the user profile detail and teams owned by user.
    User can update the profile(change username or email).
    '''

    permission_classes = [IsAuthenticated]

    def get(self,request,format=None):
        profile=User.objects.get(username=request.user)
        serializer_profile=UserSerializer(profile)
        team_own=Team.objects.filter(owner=request.user)
        serializer_own=TeamSerializer(team_own,many=True)
        return Response({
                        'profile':serializer_profile.data,
                        'teams':serializer_own.data}
                        ,status=status.HTTP_200_OK)
        
    
    def put(self,request,format=None):
        user=request.user
        serializer=UserSerializer(user,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
class AddTeamMemberAPIView(APIView):
    '''
    This class will add member to team.
    '''
    permission_classes = [IsAuthenticated]

    def get_object(self, slug):
        try:
            team=Team.objects.get(slug=slug)
            if IsOwner(self.request,team).has_permission:
                return team
            raise Http404
        except Team.DoesNotExist:
            raise Http404
    
    def post(self,request,slug,format=None):
        team=self.get_object(slug)
        try:
            user=User.objects.get(username=request.data['username'])
        except User.DoesNotExist:
            return Response("User doesn't exist",status=status.HTTP_400_BAD_REQUEST)
        team.members.add(user)
        return Response(status=status.HTTP_200_OK)
    
    def delete(self,request,slug,format=None):
        team=self.get_object(slug)
        try:
            user=User.objects.get(username=request.data['username'])
        except User.DoesNotExist:
            return Response("User doesn't exist",status=status.HTTP_400_BAD_REQUEST)
        team.members.remove(user)
        return Response(status=status.HTTP_200_OK)