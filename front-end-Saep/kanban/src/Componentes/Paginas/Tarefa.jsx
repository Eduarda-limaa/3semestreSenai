import axios from 'axios';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schemaCadTarefa = z.object({
  descricao: z
    .string()
    .min(40, 'Escreva uma descrição válida! Com no mínimo 40 caracteres!')
    .max(300, 'Você não pode ultrapassar 300 caracteres!')
    .regex(/^[a-zA-ZÀ-ú\s]+$/, { message: 'A descrição deve conter apenas letras e espaços' })
    .regex(/^(?!.*(.)\1{3,}).*$/, { message: 'Não repita tantas vezes a mesma letra' }),
  setor: z
    .string()
    .min(3, 'Escreva um setor válido! Com no mínimo 3 caracteres!')
    .max(60, 'Você não pode ultrapassar 60 caracteres!')
    .regex(/^[a-zA-ZÀ-ú\s]+$/, { message: 'O setor deve conter apenas letras e espaços' })
    .regex(/^(?!.*(.)\1{3,}).*$/, { message: 'Não repita tantas vezes a mesma letra' }),
  usuario: z
    .string()
    .min(1, 'Selecione um usuário!'),
  prioridade: z
    .string()
    .min(1, 'Selecione uma prioridade!')
});

export function CadTarefa() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({ resolver: zodResolver(schemaCadTarefa) });

  async function obterDados(data) {
    console.log('Dados recebidos', data);

    try {
      await axios.post('http://127.0.0.1:8000/api/tarefa/', data);
      alert('Tarefa cadastrada com sucesso!');
      reset();
    } catch (error) {
      alert('Erro ao cadastrar tarefa');
      console.error('Deu ruim.', error);
    }
  }

  return (
    <form className="formulario" onSubmit={handleSubmit(obterDados)}>
      <h1 className="titulo">Cadastro de Tarefas</h1>

      <label>Descrição:</label>
      <input type="text" alt="campo de descrição" {...register('descricao')} />
      {errors.descricao && <p className="erro">{errors.descricao.message}</p>}

      <label>Setor:</label>
      <input type="text" alt="setor" {...register('setor')} />
      {errors.setor && <p className="erro">{errors.setor.message}</p>}

      <label>Usuário:</label>
      <select {...register('usuario')}>
        <option value="">Selecione o Usuário</option>
        <option value="Maria">Maria</option>
        <option value="Duda">Duda</option>
        <option value="Eduarda">Eduarda</option>
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
