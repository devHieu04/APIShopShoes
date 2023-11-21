from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.authtoken.models import Token
from .models import CustomUser
from .serializers import UserSerializer

@api_view(['POST', 'OPTIONS'])
def register_user(request):
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST', 'OPTIONS'])
def user_login(request):
    if request.method == 'POST':
        username = request.data.get('username')
        password = request.data.get('password')

        user = None
        if '@' in username:
            try:
                user = CustomUser.objects.get(email=username)
            except ObjectDoesNotExist:
                pass

        if not user:
            user = authenticate(username=username, password=password)

        if user:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({'token': token.key , 'role': user.role}, status=status.HTTP_200_OK)

        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    elif request.method == 'OPTIONS':
        return Response(status=status.HTTP_200_OK)

@api_view(['POST', 'OPTIONS'])
@permission_classes([IsAuthenticated])
def user_logout(request):
    if request.method == 'POST':
        try:
            # Delete the user's token to logout
            request.user.auth_token.delete()
            return Response({'message': 'Successfully logged out.'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    elif request.method == 'OPTIONS':
        return Response(status=status.HTTP_200_OK)
    
@api_view(['PUT', 'OPTIONS'])
@permission_classes([IsAuthenticated])
def update_user(request, user_id):
    try:
       
        current_user = request.user
        if not current_user.role == 'Admin':
            return Response({'error': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)
        user_to_update = CustomUser.objects.get(pk=user_id)
        serializer = UserSerializer(user_to_update, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except CustomUser.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # Handling OPTIONS request
    if request.method == 'OPTIONS':
        return Response(status=status.HTTP_200_OK)
@api_view(['DELETE']) 
@permission_classes([IsAuthenticated])
def delete_user(request, user_id):

    try:
        current_user = request.user
        if current_user.role != 'Admin':
            return Response({'error':'Permission denied'}, status=status.HTTP_403_FORBIDDEN)
            
        user_to_delete = CustomUser.objects.get(pk=user_id)
        user_to_delete.delete()
        return Response({'message': 'User deleted successfully'}, status=status.HTTP_204_NO_CONTENT)

    except CustomUser.DoesNotExist:
        return Response({'error':'User not found'}, status=status.HTTP_404_NOT_FOUND)

    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
# api get all users
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_users(request):
    try:
        current_user = request.user
        if not current_user.role == 'Admin':
            return Response({'error': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)

        users = CustomUser.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

