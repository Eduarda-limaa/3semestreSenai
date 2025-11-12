import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import axios from 'axios'
import { CadTarefa } from './CadTarefa'
import '@testing-library/jest-dom'

vi.mock('axios')

describe('Componente CadTarefa', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: [{ id: 1, nome: 'Maria' }] })
    axios.post = vi.fn().mockResolvedValue({ data: { success: true } })
  })

  it('renderiza o título e os campos corretamente', async () => {
    render(<CadTarefa />)
    expect(screen.getByRole('heading', { name: /cadastro de tarefas/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/descrição/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/setor/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/usuário/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/prioridade/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /cadastrar/i })).toBeInTheDocument()
  })

  it('busca e exibe usuários da API', async () => {
    render(<CadTarefa />)
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('http://127.0.0.1:8000/api/usuario/')
    })
    const option = await screen.findByRole('option', { name: /maria/i })
    expect(option).toBeInTheDocument()
  })

  it('permite preencher formulário e submeter', async () => {
    render(<CadTarefa />)

    const descricaoInput = screen.getByLabelText(/descrição/i)
    const setorInput = screen.getByLabelText(/setor/i)
    const usuarioSelect = screen.getByLabelText(/usuário/i)
    const prioridadeSelect = screen.getByLabelText(/prioridade/i)
    const botaoCadastrar = screen.getByRole('button', { name: /cadastrar/i })

    // espera o usuário aparecer no select
    await screen.findByRole('option', { name: /maria/i })

    // preenche o formulario com dados válidos
    await userEvent.type(descricaoInput, 'Nova tarefa com pelo menos 20 caracteres')
    await userEvent.type(setorInput, 'MAA')
    await userEvent.selectOptions(usuarioSelect, '1')
    await userEvent.selectOptions(prioridadeSelect, 'Alta')

    
    await userEvent.click(botaoCadastrar)

    // visualiza se axios.post foi chamado corretamente
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'http://127.0.0.1:8000/api/tarefa/',
        {
          descricao: 'Nova tarefa com pelo menos 20 caracteres',
          setor: 'MAA',
          usuario: '1',
          prioridade: 'Alta'
        }
      )
    })
  })
})
