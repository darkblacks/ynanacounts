// autt.js
import { createClient } from 'https://esm.sh/@supabase/supabase-js'

(async () => {
  const supabase = createClient(
    'https://oloqbftzeorsytwxebbd.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9sb3FiZnR6ZW9yc3l0d3hlYmJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0NDM5ODYsImV4cCI6MjA2NDAxOTk4Nn0.3xFLARVgIGRzQLcoIL43KmDoRPxu6CcOYfOmE24lI0A'
  )

  const url = new URL(window.location.href)
  const access_token = url.hash.split('access_token=')[1]?.split('&')[0]

  if (access_token) {
    await supabase.auth.setSession({ access_token, refresh_token: '' })

    document.querySelector('h1').textContent = "Conta confirmada com sucesso!"
    document.getElementById('msg').innerHTML = `
      Sua jornada em <strong>Os Contos de Ynana</strong> está prestes a começar.<br>
      Clique no botão abaixo para fazer login e acessar o portal.
    `
    document.getElementById('btn-login').style.display = "inline-block"
  } else {
    document.body.innerHTML = `
      <h1>Erro ao confirmar e-mail.</h1>
      <p>O link de verificação parece inválido ou expirado.<br>
      Tente se registrar novamente ou entre em contato conosco.</p>
    `
  }
})()
