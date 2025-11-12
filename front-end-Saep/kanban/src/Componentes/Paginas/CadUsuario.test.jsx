import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import axios from 'axios'
import { CadUsuario } from './CadUsuario'
import '@testing-library/jest-dom'

vi.mock('axios')
global.alert = vi.fn()

describe('Componente CadUsuario', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    axios.post = vi.fn().mockResolvedValue({ data: { success: true } })
  })

  it('renderiza título, inputs e botão', () => {
    render(<CadUsuario />)
    expect(screen.getByRole('heading', { name: /cadastro de usuário/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /cadastrar/i })).toBeInTheDocument()
  })

  describe('Validações do formulário', () => {
    it('exibe erros quando campos estão vazios', async () => {
      render(<CadUsuario />)
      const botao = screen.getByRole('button', { name: /cadastrar/i })
      await userEvent.click(botao)

      await waitFor(async () => {
        const alerts = await screen.findAllByRole('alert')
        expect(alerts.some(a => a.textContent.includes('Informe um nome válido'))).toBe(true)
        expect(alerts.some(a => a.textContent.includes('Email inválido'))).toBe(true)
      })

      expect(axios.post).not.toHaveBeenCalled()
    })

    it('exibe erro quando nome é muito curto', async () => {
      render(<CadUsuario />)
      const nomeInput = screen.getByLabelText(/nome/i)
      const emailInput = screen.getByLabelText(/e-mail/i)
      const botao = screen.getByRole('button', { name: /cadastrar/i })

      await userEvent.type(nomeInput, 'Ana')
      await userEvent.type(emailInput, 'ana@test.com')
      await userEvent.click(botao)

      await waitFor(async () => {
        const alerts = await screen.findAllByRole('alert')
        expect(alerts.some(a => a.textContent.includes('Informe um nome válido'))).toBe(true)
      })

      expect(axios.post).not.toHaveBeenCalled()
    })

    it('exibe erro quando nome não contém vogal', async () => {
      render(<CadUsuario />)
      const nomeInput = screen.getByLabelText(/nome/i)
      const emailInput = screen.getByLabelText(/e-mail/i)
      const botao = screen.getByRole('button', { name: /cadastrar/i })

      await userEvent.type(nomeInput, 'Bcdf Ghjk')
      await userEvent.type(emailInput, 'teste@test.com')
      await userEvent.click(botao)

      await waitFor(async () => {
        const alerts = await screen.findAllByRole('alert')
        expect(alerts.some(a => a.textContent.includes('deve conter ao menos uma vogal'))).toBe(true)
      })

      expect(axios.post).not.toHaveBeenCalled()
    })

    it('exibe erro quando email é inválido', async () => {
      render(<CadUsuario />)
      const nomeInput = screen.getByLabelText(/nome/i)
      const emailInput = screen.getByLabelText(/e-mail/i)
      const botao = screen.getByRole('button', { name: /cadastrar/i })

      await userEvent.type(nomeInput, 'Maria Silva')
      await userEvent.type(emailInput, 'invalid-email')
      await userEvent.click(botao)

      await waitFor(async () => {
        const alerts = await screen.findAllByRole('alert')
        expect(alerts.some(a => a.textContent.includes('Email inválido'))).toBe(true)
      })

      expect(axios.post).not.toHaveBeenCalled()
    })
  })

  it('envia formulário válido e reseta inputs', async () => {
    render(<CadUsuario />)
    const nomeInput = screen.getByLabelText(/nome/i)
    const emailInput = screen.getByLabelText(/e-mail/i)
    const botao = screen.getByRole('button', { name: /cadastrar/i })

    await userEvent.type(nomeInput, 'Maria Eduarda Silva')
    await userEvent.type(emailInput, 'maria@test.com')
    await userEvent.click(botao)

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://127.0.0.1:8000/api/usuario/', {
        nome: 'Maria Eduarda Silva',
        email: 'maria@test.com'
      })
    })

    expect(global.alert).toHaveBeenCalledWith('Usuário cadastrado com sucesso!')
    expect(nomeInput.value).toBe('')
    expect(emailInput.value).toBe('')
  })

  it('exibe alert de erro quando axios falha', async () => {
    axios.post.mockRejectedValue(new Error('Falha na API'))
    render(<CadUsuario />)
    const nomeInput = screen.getByLabelText(/nome/i)
    const emailInput = screen.getByLabelText(/e-mail/i)
    const botao = screen.getByRole('button', { name: /cadastrar/i })

    await userEvent.type(nomeInput, 'Maria Eduarda Silva')
    await userEvent.type(emailInput, 'maria@test.com')
    await userEvent.click(botao)

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled()
      expect(global.alert).toHaveBeenCalledWith('Erro ao cadastrar usuário')
    })
  })

  it('remove mensagens de erro ao corrigir campos', async () => {
    render(<CadUsuario />)
    const nomeInput = screen.getByLabelText(/nome/i)
    const emailInput = screen.getByLabelText(/e-mail/i)
    const botao = screen.getByRole('button', { name: /cadastrar/i })

    // gera o erro inicial
    await userEvent.click(botao)
    await waitFor(async () => {
      const alerts = await screen.findAllByRole('alert')
      expect(alerts.some(a => a.textContent.includes('Informe um nome válido'))).toBe(true)
      expect(alerts.some(a => a.textContent.includes('Email inválido'))).toBe(true)
    })

  
    await userEvent.clear(nomeInput)
    await userEvent.type(nomeInput, 'Maria Eduarda Silva')
    await userEvent.clear(emailInput)
    await userEvent.type(emailInput, 'maria@test.com')

    await waitFor(() => {
      const alertsAfter = screen.queryAllByRole('alert')
      expect(alertsAfter.length).toBe(0)
    })
  })
})
