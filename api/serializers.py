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
        fields = ['id', 'name', 'description','owner', 'members', 'created_at']
        read_only_fields = ['id', 'owner', 'created_at']

    def update(self, instance, validated_data):
        #for some reason owner is required here even when 
        # updating owner isn't allowed or is read only.
        # Prevent updating the owner during update.
        validated_data.pop('owner', None)
        return super().update(instance, validated_data)
    

#This serializer will be used for Serializing "FOR GET QUERY" data only.
class ProjectSerializer(serializers.ModelSerializer):
    team = serializers.SlugRelatedField(slug_field='slug', queryset=Team.objects.all())
    class Meta:
        model = Project
        fields = ['id', 'name', 'description', 'team', 'tasks', 'notes', 'created_at']
        read_only_fields = ['id', 'created_at','tasks','notes'] #tasks and notes are read only fields for project


class ProjectOperationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['id', 'name', 'description', 'team', 'tasks', 'notes', 'created_at']
        read_only_fields = ['id', 'created_at','team','tasks','notes'] #tasks and notes are read only fields for project



class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'name', 'description', 'project', 'created_at']
        read_only_fields = ['id', 'created_at']

 

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['id', 'name', 'description', 'project', 'created_at']
        read_only_fields = ['id', 'created_at']

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['id']['created_at'] = None
        return data

    def create(self,validated_data):
        project_data = validated_data.pop('project')
        try:
            validated_data['project']= Project.objects.get(**project_data)
        except Project.DoesNotExist:
            raise ValidationError("Specified project does not exist.")
        return super().create(validated_data)


