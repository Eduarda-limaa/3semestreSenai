from django.db import models
from django.utils import timezone

class Usuario(models.Model):
    nome = models.CharField(max_length=60)
    email = models.CharField(max_length=30)
    
    def __str__(self):
        return f'{self.id} {self.nome}'

class Tarefa(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name="tarefas")
    descricao = models.TextField()  # aceita textos longos do front
    setor = models.CharField(max_length=60)  # aceita letras, números, espaços e hífens
    
    PRIORIDADE = [
        ('Baixa', 'Baixa'),
        ('Média', 'Média'),
        ('Alta', 'Alta')
    ]
    prioridade = models.CharField(max_length=6, choices=PRIORIDADE)
    
    data_cadastro = models.DateTimeField(default=timezone.now)  # datetime completo
    
    STATUS = [
        ('a fazer', 'A fazer'),
        ('fazendo', 'Fazendo'),
        ('pronto', 'Pronto')
    ]
    status = models.CharField(max_length=10, choices=STATUS, default='a fazer')
    
    def __str__(self):
        return f"{self.descricao[:30]}... - {self.prioridade}"
