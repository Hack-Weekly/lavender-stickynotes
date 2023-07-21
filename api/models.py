from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
     pass


class Team(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    members = models.ManyToManyField(User, related_name='teams')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    

class Project(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='projects')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    

class Task(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='tasks')
    group=models.ForeignKey('Group',on_delete=models.CASCADE,related_name='tasks',null=True,blank=True)
    objectives=models.ManyToManyField('Objectives',related_name='tasks',blank=True)
    deadline = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    
class Note(models.Model):
    name = models.CharField(max_length=100)
    group=models.ForeignKey('Group',on_delete=models.CASCADE,related_name='notes',null=True,blank=True)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Group(models.Model):
    name = models.CharField(max_length=100)
    def __str__(self):
        return self.name
    
class Objectives(models.Model):
    name = models.CharField(max_length=100)
    completed=models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
