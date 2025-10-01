import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Schema de validação robusto
const schemaCadTarefa = z.object({
  descricao: z
    .string()
    .min(20, 'A descrição precisa ter pelo menos 20 caracteres!')
    .max(300, 'A descrição não pode ultrapassar 300 caracteres!')
    .regex(/^(?=.*[a-zA-ZÀ-ú])[a-zA-ZÀ-ú0-9\s.,\-()]+$/, 
      { message: 'A descrição deve conter letras válidas e não apenas números ou símbolos' })
    .regex(/^(?!.*(.)\1{4,}).*$/, 
      { message: 'Não repita tantos caracteres consecutivos' }),
  setor: z
    .string()
    .min(3, 'O setor precisa ter pelo menos 3 caracteres!')
    .max(60, 'O setor não pode ultrapassar 60 caracteres!')
    .regex(/^(?=.*[a-zA-Z0-9])[A-ZÀ-ú0-9\s\-]+$/i, 
      { message: 'O setor deve conter letras, números, espaços ou hífens' })
    .regex(/^(?!.*(.)\1{4,}).*$/, 
      { message: 'Não repita tantos caracteres consecutivos' }),
  usuario: z
    .string()
    .min(1, 'Selecione um usuário!'),
  prioridade: z
    .string()
    .min(1, 'Selecione uma prioridade!')
});

export function CadTarefa() {
  const [usuarios, setUsuarios] = useState([]);
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(schemaCadTarefa)
  });

  useEffect(() => {
    async function fetchUsuarios() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/usuario/');
        setUsuarios(response.data);
      } catch (error) {
        console.error('Erro ao carregar usuários', error);
        alert('Erro ao carregar usuários do sistema');
      }
    }
    fetchUsuarios();
  }, []);

  async function obterDados(data) {
    if (!data.usuario || !data.prioridade) {
      alert('Por favor, selecione usuário e prioridade!');
      return;
    }

    try {
      await axios.post('http://127.0.0.1:8000/api/tarefa/', data);
      alert('Tarefa cadastrada com sucesso!');
      reset();
    } catch (error) {
      console.error('Erro ao cadastrar tarefa', error);
      if (error.response && error.response.data) {
        alert('Erro ao cadastrar tarefa: ' + JSON.stringify(error.response.data));
      } else {
        alert('Erro ao cadastrar tarefa');
      }
    }
  }

  return (
    <form className="formulario" onSubmit={handleSubmit(obterDados)}>
      <h1 className="titulo">Cadastro de Tarefas</h1>

      <label>Descrição:</label>
      <input type="text" {...register('descricao')} />
      {errors.descricao && <p className="erro">{errors.descricao.message}</p>}

      <label>Setor:</label>
      <input type="text" {...register('setor')} />
      {errors.setor && <p className="erro">{errors.setor.message}</p>}

      <label>Usuário:</label>
      <select {...register('usuario')}>
        <option value="">Selecione o Usuário</option>
        {usuarios.map(u => (
          <option key={u.id} value={u.id}>{u.nome}</option> // envia ID
        ))}
      </select>
      {errors.usuario && <p className="erro">{errors.usuario.message}</p>}

      <label>Prioridade:</label>
      <select {...register('prioridade')}>
        <option value="">Selecione a Prioridade</option>
        <option value="Alta">Alta</option>
        <option value="Média">Média</option>
        <option value="Baixa">Baixa</option>
      </select>
      {errors.prioridade && <p className="erro">{errors.prioridade.message}</p>}

      <button type="submit">Cadastrar</button>
    </form>
  );
}
