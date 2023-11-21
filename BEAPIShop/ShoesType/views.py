from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated,BasePermission
from rest_framework.response import Response
from rest_framework import status
from .models import ShoesType
from .serializers import ShoesTypeSerializer
class IsAdminOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        # Kiểm tra xem người dùng hiện tại có phải là Admin hay không
        return request.user.role == 'Admin' if request.method in ('POST', 'PUT', 'DELETE') else True
@api_view(['POST', 'OPTIONS'])
@permission_classes([IsAuthenticated, IsAdminOrReadOnly])
def create_shoes_type(request):
    if request.method == 'POST':
        serializer = ShoesTypeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT', 'OPTIONS'])
@permission_classes([IsAuthenticated, IsAdminOrReadOnly])
def update_shoes_type(request, shoes_type_id):
    try:
        shoes_type = ShoesType.objects.get(pk=shoes_type_id)
        serializer = ShoesTypeSerializer(shoes_type, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except ShoesType.DoesNotExist:
        return Response({'error': 'ShoesType not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated, IsAdminOrReadOnly])
def delete_shoes_type(request, shoes_type_id):
    try:
        shoes_type = ShoesType.objects.get(pk=shoes_type_id)
        shoes_type.delete()
        return Response({'message': 'ShoesType deleted successfully'}, status=status.HTTP_204_NO_CONTENT)

    except ShoesType.DoesNotExist:
        return Response({'error': 'ShoesType not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_shoes_types(request):
    try:
        shoes_types = ShoesType.objects.all()
        serializer = ShoesTypeSerializer(shoes_types, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
