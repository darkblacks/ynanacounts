// index2.js

document.addEventListener('DOMContentLoaded', () => {
  const nomeUsuario = sessionStorage.getItem('usuario') || null;
  const acessLvl = sessionStorage.getItem('acess_lvl') || null;
  const readerWriter = sessionStorage.getItem('reader_writer') || null;

  const welcomeEl = document.getElementById('welcome');
  const userEl = document.getElementById('user-logado');
  const authButtons = document.getElementById('auth-buttons');
  const userButtons = document.getElementById('user-buttons');
  const adminButtons = document.getElementById('admin-buttons');
  const writerArea = document.getElementById('writer-area');
  const adminToggle = document.getElementById('admin-toggle');
  const userToggle = document.getElementById('user-toggle');
  const whatsappArea = document.getElementById('whatsapp-area');
  const logoutArea = document.getElementById('logout-area');
  const logoutBtn = document.getElementById('logout-btn');
  const bottomBar = document.getElementById('bottom-bar');
  const botaoMedieval = bottomBar.querySelector('.botao-medieval');

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
    authButtons.style.display = 'none';
    userButtons.style.display = 'flex';
    bottomBar.style.display = 'grid';
    botaoMedieval.style.display = 'block';

    if (readerWriter && readerWriter.toLowerCase() === 'writer') {
      writerArea.style.display = 'flex';
    }

    logoutArea.style.display = 'flex';
    logoutBtn.addEventListener('click', () => {
      sessionStorage.clear();
      window.location.reload();
    });

    if (acessLvl && acessLvl.toLowerCase() === 'admin') {
      whatsappArea.style.display = 'none';
      adminToggle.style.display = 'flex';
      userToggle.style.display = 'none';
      adminToggle.addEventListener('click', () => {
        userButtons.style.display = 'none';
        adminButtons.style.display = 'flex';
        adminToggle.style.display = 'none';
        userToggle.style.display = 'flex';
      });
      userToggle.addEventListener('click', () => {
        adminButtons.style.display = 'none';
        userButtons.style.display = 'flex';
        userToggle.style.display = 'none';
        adminToggle.style.display = 'flex';
      });
    } else {
      adminToggle.style.display = 'none';
      userToggle.style.display = 'none';
      whatsappArea.style.display = 'flex';
    }
  } else {
    authButtons.style.display = 'flex';
    logoutArea.style.display = 'none';
    adminToggle.style.display = 'none';
    userToggle.style.display = 'none';
    whatsappArea.style.display = 'none';
    bottomBar.style.display = 'none';
  }
});
