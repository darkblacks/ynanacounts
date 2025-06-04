// Scroll suave ao clicar nos links do menu
document.querySelectorAll('nav ul li a').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const destino = document.querySelector(this.getAttribute('href'));
    destino.scrollIntoView({ behavior: 'smooth' });
  });
});

// Efeito de "revelar página" ao rolar
const paginas = document.querySelectorAll('.pagina');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visivel');
    }
  });
}, {
  threshold: 0.1
});

paginas.forEach(pagina => {
  observer.observe(pagina);
});
