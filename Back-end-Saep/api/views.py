from django.shortcuts import render
from .models import Usuario, Tarefa
from .serializer import UsuarioSerializer, TarefaSerializer
from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListCreateAPIView, ListAPIView

class ListCreateUsuario(ListCreateAPIView):
    serializer_class= UsuarioSerializer
    queryset= Usuario.objects.all()
    
class ListCreateTarefa(ListCreateAPIView):
    serializer_class= TarefaSerializer
    queryset= Tarefa.objects.all()
    
class RetrieveUpdateDestroyTarefa(RetrieveUpdateDestroyAPIView):
    serializer_class= TarefaSerializer
    queryset= Tarefa.objects.all()