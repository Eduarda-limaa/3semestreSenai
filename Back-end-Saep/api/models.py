from django.db import models

class Usuario(models.Model):
    nome= models.CharField(max_length=20)
    email= models.CharField(max_length=30)
    REQUIRED_FIELDS= ['id', 'nome']
    
    def __str__(self):
        return f'{self.id} {self.nome}'
    

class Tarefa(models.Model):
    usuario= models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name="usuario")
    descricao= models.TextField()
    setor= models.CharField(max_length=50)
    PRIORIDADE= [
        ('baixa', 'Baixa'),
        ('média', 'Média'),
        ('alta', 'Alta')
    ]
    prioridade= models.CharField(max_length=6, choices=PRIORIDADE)
    data_cadastro= models.DateField(blank=True, null=True)
    STATUS=[
        ('a fazer', 'A fazer'),
        ('fazendo', 'Fazendo'),
        ('pronto', 'Pronto')
    ]
    status= models.CharField(max_length=10, choices=STATUS, default='fazer')
    
    def __str__(self):
       return f"{self.descricao} - {self.prioridade}"
    
