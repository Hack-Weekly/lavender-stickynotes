import requests
import json

BASE_URL = 'http://0.0.0.0:8000/api/'

user_data = {
    'username': 'new_user',
    'email': 'new_user@example.com',
    'password': 'testpassword123',
}

response = requests.post(BASE_URL + 'token/', data=user_data)
if response.status_code == 200:  # User successfully requested the token
    data = response.json()
    access_token = data['access']
    refresh_token = data['refresh']

    # Use the access and refresh tokens for further communications
    # ...

    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json',  # Specify the content type as JSON
    }
    refresh_data = {
        'refresh': refresh_token,
    }

    team_data = {
        'name': 'new_x_team8',
        'description': 'this is description for creation of team using xclient!',
    }
    create_team_response = requests.post(BASE_URL + 'teams/', data=json.dumps(team_data), headers=headers)
    if create_team_response.status_code == 201:
        data = create_team_response.json()
        print(data)
    else:
        print(f"Failed to create team. Status code: {create_team_response.status_code}, Error: {create_team_response.json()}")

else:
    print(f"Failed to get access token. Status code: {response.status_code}, Error: {response.json()}")
