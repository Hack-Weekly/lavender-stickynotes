from django.db import models
from django.contrib.auth.models import AbstractUser

#import slugify
from django.utils.text import slugify

class User(AbstractUser):
      '''
      Basic User model with email as username
      '''
      description = models.TextField()

      def __str__(self):
          return self.username


class Team(models.Model):
    '''
    Team is owned by a user and is consist of projects and members.
    User can invite other user to collabrate on a team.
    '''
    owner=models.ForeignKey(User,on_delete=models.CASCADE,related_name='team_owner')
    name = models.CharField(max_length=100)
    description = models.TextField()
    members = models.ManyToManyField(User, related_name='team_members', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    slug=models.SlugField(max_length=100,unique=True)

    def __str__(self):
        return self.name
    
    def save(self,*args,**kwargs):
        if not self.slug:
            self.slug=self.name.replace(' ','-').lower()
        super(Team,self).save(*args,**kwargs)
    

class Project(models.Model):
    '''
    Project is owned by a team and is consist of tasks and notes
    Team member have access to project.

    strucutre:
    Team-
        Project=[Task1,Task2,Note1,Note2]
    '''
    name = models.CharField(max_length=100)
    description = models.TextField()
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='project_team')
    tasks = models.ManyToManyField('Task',related_name='project_tasks',blank=True)
    notes=models.ManyToManyField('Note',related_name='project_notes',blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    slug=models.SlugField(max_length=100,unique=True)
    
    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug=slugify(self.name)
        super(Project, self).save(*args, **kwargs)


class Task(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=500)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='task_project')
    group=models.ForeignKey('Group',on_delete=models.CASCADE,related_name='task_group',null=True,blank=True)
    objectives=models.ManyToManyField('Objectives',related_name='task_objectives',blank=True)
    deadline = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    
class Note(models.Model):
    name = models.CharField(max_length=100)
    project=models.ForeignKey(Project,on_delete=models.CASCADE,related_name='note_project')
    group=models.ForeignKey('Group',on_delete=models.CASCADE,related_name='note_group',null=True,blank=True)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Group(models.Model):
    '''
    Will be used to group Notes and Tasks
    for example: Progress, Backlog, Completed or any other group user wish to name.
    strucutre:
    Team-
        Project-
            Group=[Task1,Task2,Note1,Note2]
    '''
    name = models.CharField(max_length=100)
    project=models.ForeignKey(Project,on_delete=models.CASCADE,related_name='group_project')
    
    def __str__(self):
        return self.name
    
class Objectives(models.Model):
    '''
    used as single objective for a task

    strucutre:
    Task=[Objective1,Objective2,objective3,Objective4]
    '''
    name = models.CharField(max_length=100)
    completed=models.BooleanField(default=False)
    task=models.ForeignKey(Task,on_delete=models.CASCADE,related_name='objective_task')
    created_at = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return self.name
