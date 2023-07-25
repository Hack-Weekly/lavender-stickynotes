
class IsOwner:
    '''
    Check if requesting user is owner of the team.
    Incase of project, check if the requesting user is owner of the team
    '''

    def __init__(self,request, team):
        self.team = team
        self.request = request

    def has_permission(self, request):
        return self.team.owner == request.user
    
class IsMember:
    '''
    Check if requesting user is member of the team.
    Incase of project, check if the requesting user is member of the team
    '''
    def __init__(self,request, team):
        self.team = team
        self.request = request

    def has_permission(self, request):
        return self.team.members.filter(id=request.user.id).exists()