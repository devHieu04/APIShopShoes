# serializers.py
from rest_framework import serializers
from .models import CustomUser


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["username", "email", "password", "phone", "address", "role"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        # Mặc định role là 'User' nếu không có giá trị được cung cấp
        role = validated_data.get("role", "User")

        user = CustomUser(
            username=validated_data["username"],
            email=validated_data["email"],
            phone=validated_data.get("phone", ""),
            address=validated_data.get("address", ""),
            role=role,
        )

        user.set_password(validated_data["password"])
        user.save()
        return user
