import requests

BASE_URL = 'http://0.0.0.0:8000/api/'

user_data = {
    'username': 'new_user',
    'email': 'new_user@example.com',
    'password': 'testpassword123',
}

response = requests.post(BASE_URL + 'token/', data=user_data)
if response.status_code == 200:  # User successfully requested the
    data = response.json()
    access_token = data['access']
    refresh_token = data['refresh']

    # Use the access and refresh tokens for further communications
    #this can be used to make authenticated API requests using the access token
    #refresh token can be used to get new token after the access token expires
    #as far as i remember the access token expires after 5 minutes check settings.py for accurate time limit
    #Its 13 minute for access token and 50 day for refresh token
    headers = {
        'Authorization': f'Bearer {access_token}',
    }
    refresh_data = {
        'refresh': refresh_token,
    }
else:
    print(f"Failed to get access token. Status code: {response.status_code}, Error: {response.json()}")
