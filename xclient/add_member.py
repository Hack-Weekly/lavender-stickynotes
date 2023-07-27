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
# username as  of user whome you want to add as member
member_username = 'admin'

# Send the request to add the member to the team
add_member_data = {
    'username': member_username,
}

headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json',
    }
refresh_data = {
        'refresh': refresh_token,
    }

add_member_response = requests.post(BASE_URL + 'team/new_x_team6/add/', data=json.dumps(add_member_data), headers=headers)
if add_member_response.status_code == 200:
    print("Member added successfully.")
else:
    print(f"Failed to add member. Status code: {add_member_response.status_code}, Error: {add_member_response.json()}")
