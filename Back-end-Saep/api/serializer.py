from rest_framework import serializers
from .models import Usuario, Tarefa
import re

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model= Usuario
        fields= '__all__'
        
class TarefaSerializer(serializers.ModelSerializer):
    # Recebe ID do usuário
    usuario = serializers.PrimaryKeyRelatedField(queryset=Usuario.objects.all())

    class Meta:
        model = Tarefa
        fields = '__all__'