from django.contrib import admin
from api.models import User, Team, Project, Task, Note,Objectives,Notification
# Register your models here.
admin.site.register(User)
admin.site.register(Team)
admin.site.register(Project)
admin.site.register(Task)
admin.site.register(Note)
admin.site.register(Objectives)
admin.site.register(Notification)
