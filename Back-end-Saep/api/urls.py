from django.urls import path
from .views import ListCreateUsuario, ListCreateTarefa, RetrieveUpdateDestroyTarefa

urlpatterns= [
    path('usuario/', view=ListCreateUsuario.as_view(), name='criacao_usuario'),
    path('tarefa/', view=ListCreateTarefa.as_view(), name='criacao_tarefa'),
    path('tarefa/<int:pk>', view=RetrieveUpdateDestroyTarefa.as_view(), name='detalhes_tarefas')
]