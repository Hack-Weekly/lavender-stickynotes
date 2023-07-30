from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.exceptions import ValidationError
#project serializers
from .models import Team, Project, Task, Note,Objectives


User=get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username','email']




class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email
        # ...

        return token


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username','email','password', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email']
        )

        user.set_password(validated_data['password'])
        user.save()

        return user



#This serializer will be used for Serializing "FOR GET QUERY" data only.
class TeamSerializer(serializers.ModelSerializer):
    owner = serializers.SlugRelatedField(slug_field='username', queryset=User.objects.all())
    class Meta:
        model = Team
        fields = ['id', 'name','owner', 'description', 'slug', 'members', 'created_at']
        read_only_fields = ['id', 'owner','slug', 'created_at']


class TeamOperationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ['id', 'name','owner', 'description', 'slug', 'members', 'created_at']
        read_only_fields = ['id', 'owner','slug', 'created_at']



class ObjectivesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Objectives
        fields = '__all__'
        read_only_fields = ['id']


class TaskSerializer(serializers.ModelSerializer):
    owner = serializers.SlugRelatedField(slug_field='username', queryset=User.objects.all())
    objectives = ObjectivesSerializer(many=True, required=False)
    class Meta:
        model = Task
        fields = ['id', 'name','description','objectives', 'project','owner', 'created_at']
        read_only_fields = ['id', 'created_at','owner']



class TaskOperationSerializer(serializers.ModelSerializer):
    objectives = ObjectivesSerializer(many=True, required=False)
    class Meta:
        model = Task
        fields = ['id', 'name', 'description','objectives','project','deadline','owner','created_at']
        read_only_fields = ['id', 'created_at','owner']


    def create(self, validated_data):
        objectives_data = validated_data.pop('objectives', [])
        task = Task.objects.create(**validated_data)

        for objective_data in objectives_data:
            objective=Objectives.objects.create(task=task, **objective_data)
            #there was no way to handle many to many field so appending the objectives
            #here
            task.objectives.add(objective)
        return task
 

class NoteSerializer(serializers.ModelSerializer):
    owner = serializers.SlugRelatedField(slug_field='username', queryset=User.objects.all())
    class Meta:
        model = Note
        fields = ['id', 'name','description', 'project','owner', 'created_at']
        read_only_fields = ['id', 'created_at','owner']


class NoteOperationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['id', 'name','description', 'project','owner', 'created_at']
        read_only_fields = ['id', 'created_at','owner']

    

#This serializer will be used for Serializing "FOR GET QUERY" data only.
class ProjectSerializer(serializers.ModelSerializer):
    team = serializers.SlugRelatedField(slug_field='slug', queryset=Team.objects.all())
    tasks=TaskSerializer(many=True, required=False)
    notes=NoteSerializer(many=True, required=False)
    
    class Meta:
        model = Project
        fields = ['id', 'name', 'description','slug', 'team', 'tasks', 'notes', 'created_at']
        read_only_fields = ['id', 'created_at','slug','tasks','notes'] #tasks and notes are read only fields for project


class ProjectOperationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['id', 'name', 'description', 'team', 'tasks', 'notes', 'created_at']
        read_only_fields = ['id', 'created_at','team'] 


