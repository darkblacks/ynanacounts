// index2.js

document.addEventListener('DOMContentLoaded', () => {
  const nomeUsuario = sessionStorage.getItem('usuario') || null;
  const acessLvl = sessionStorage.getItem('acess_lvl') || null;

  const welcomeEl = document.getElementById('welcome');
  const userEl = document.getElementById('user-logado');
  const logoutBtn = document.getElementById('logout-btn');

  // Texto dinâmico com ou sem nome
  const texto = nomeUsuario
    ? `Bem vindo, ${nomeUsuario}! O que vamos fazer hoje, aventureiro?`
    : 'Bem vindo, o que vamos fazer hoje, aventureiro?';

  // Typewriter effect
  let i = 0;
  function escreverTexto() {
    if (i < texto.length) {
      welcomeEl.textContent += texto.charAt(i++);
      setTimeout(escreverTexto, 60);
    }
  }
  escreverTexto();

  // Exibir nome do usuário, se logado
  if (nomeUsuario) {
    userEl.textContent = `Usuário logado: ${nomeUsuario}`;
    logoutBtn.style.display = 'inline-block';

    // Clique no botão "Sair"
    logoutBtn.addEventListener('click', () => {
      sessionStorage.clear();
      window.location.reload();
    });
  }
});
