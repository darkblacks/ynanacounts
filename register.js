import { createClient } from 'https://esm.sh/@supabase/supabase-js'

const supabase = createClient(
  'https://oloqbftzeorsytwxebbd.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9sb3FiZnR6ZW9yc3l0d3hlYmJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0NDM5ODYsImV4cCI6MjA2NDAxOTk4Nn0.3xFLARVgIGRzQLcoIL43KmDoRPxu6CcOYfOmE24lI0A'
)

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form')
  const errorBox = document.getElementById('error-message')

  function mostrarErro(msg) {
    errorBox.textContent = msg
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    errorBox.textContent = ''

    const email = document.getElementById('email').value.trim()
    const username = document.getElementById('username').value.trim()
    const favorite = document.getElementById('favorite').value
    const password = document.getElementById('password').value
    const confirm = document.getElementById('confirm_password').value

    if (password.length < 6) {
      mostrarErro('A senha deve ter no mínimo 6 caracteres.')
      return
    }

    if (password !== confirm) {
      mostrarErro('As senhas não coincidem.')
      return
    }

    // Verifica se o e-mail já existe
    const { data: emailExists, error: emailError } = await supabase
      .from('login')
      .select('email')
      .eq('email', email)

    if (emailError) {
      mostrarErro('Erro ao verificar e-mail: ' + emailError.message)
      return
    }

    if (emailExists && emailExists.length > 0) {
      mostrarErro('Erro: e-mail já cadastrado.')
      return
    }

    // Verifica se o username já existe
    const { data: userExists, error: userError } = await supabase
      .from('login')
      .select('username')
      .eq('username', username)

    if (userError) {
      mostrarErro('Erro ao verificar username: ' + userError.message)
      return
    }

    if (userExists && userExists.length > 0) {
      mostrarErro('Outro aventureiro já cadastrou este username. Tente outro.')
      return
    }

    // Insere direto na tabela login
    const { error: insertError } = await supabase.from('login').insert([
      {
        email: email,
        username: username,
        favorite_person: favorite,
        password: password  // ⚠️ Ideal: criptografar isso no backend!
      }
    ])

    if (insertError) {
      mostrarErro('Erro ao salvar usuário: ' + insertError.message)
    } else {
      // Aqui você pode chamar seu backend externo pra iniciar verificação de e-mail
      // Exemplo: await fetch('https://seuservidor.com/verifica', { method: 'POST', body: JSON.stringify({ email }) })

      window.location.href = 'register2.html'
    }
  })

  // Validação em tempo real das senhas
  const passwordInput = document.getElementById('password')
  const confirmInput = document.getElementById('confirm_password')

  function validarSenhas() {
    if (confirmInput.value !== passwordInput.value) {
      confirmInput.setCustomValidity('Senhas divergentes')
      mostrarErro('As senhas não coincidem.')
    } else {
      confirmInput.setCustomValidity('')
      errorBox.textContent = ''
    }
  }

  passwordInput.addEventListener('input', validarSenhas)
  confirmInput.addEventListener('input', validarSenhas)
})
