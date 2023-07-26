import requests

BASE_URL = 'http://0.0.0.0:8000/api/'  
# Define the user data you want to register
user_data = {
    'username': 'new_user',
    'email': 'new_user@example.com',
    'password': 'testpassword123',
    'password2': 'testpassword123',
}

# Register the user using the API endpoint
response = requests.post(BASE_URL + 'register/', data=user_data)
if response.status_code == 201:  # User successfully registered
    data = response.json()
    access_token = data['access']
    refresh_token = data['refresh']

    # Use the access and refresh tokens for further communications
    # For example, you can make authenticated API requests using the access token
    headers = {
        'Authorization': f'Bearer {access_token}',
    }
    # Example API endpoint: BASE_URL + 'some-protected-endpoint/'
    # Example API request:
    # response = requests.get(BASE_URL + 'some-protected-endpoint/', headers=headers)
    # If the response status_code is 200, the request was successful.

    # If you need to refresh the access token after it expires, you can use the refresh token
    refresh_data = {
        'refresh': refresh_token,
    }
    response = requests.post(BASE_URL + 'token/refresh/', data=refresh_data)
    if response.status_code == 200:
        new_data = response.json()
        new_access_token = new_data['access']

        # Use the new_access_token for further communications

else:
    print(f"Failed to register user. Status code: {response.status_code}, Error: {response.json()}")
