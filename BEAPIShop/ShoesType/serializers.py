from rest_framework import serializers
from .models import ShoesType

class ShoesTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShoesType
        fields = '__all__'

    def create(self, validated_data):
        return ShoesType.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        return instance
