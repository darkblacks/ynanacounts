import { createClient } from 'https://esm.sh/@supabase/supabase-js'

const supabase = createClient(
  'https://oloqbftzeorsytwxebbd.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9sb3FiZnR6ZW9yc3l0d3hlYmJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0NDM5ODYsImV4cCI6MjA2NDAxOTk4Nn0.3xFLARVgIGRzQLcoIL43KmDoRPxu6CcOYfOmE24lI0A'
)

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('login-form')
  const errorBox = document.getElementById('error-message') // opcional

  function mostrarErro(msg) {
    if (errorBox) errorBox.textContent = msg
    else alert(msg)
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const email = document.getElementById('email').value.trim()
    const password = document.getElementById('password').value.trim()

    if (!email || !password) {
      mostrarErro('Preencha todos os campos!')
      return
    }

    // Busca usuário na tabela login
    const { data, error } = await supabase
      .from('login')
      .select('*')
      .eq('email', email)
      .eq('password', password) // ⚠️ Ideal: criptografar no backend
      .single()

    if (error || !data) {
      mostrarErro('E-mail ou senha inválidos.')
      return
    }

    // Salva dados na sessionStorage
    sessionStorage.setItem('usuario', data.username || 'Aventureiro')
    sessionStorage.setItem('acess_lvl', data.acess_lvl || '1')
    sessionStorage.setItem('reader_writer', data.reader_writer || '')

    window.location.href = 'index.html'
  })
})