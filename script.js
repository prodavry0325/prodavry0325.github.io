// scroll-spy
const links = document.querySelectorAll('.nav-link');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      links.forEach(l =>
        l.dataset.active = String(l.getAttribute('href') === '#' + e.target.id));
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
document.querySelectorAll('section[id]').forEach(s => observer.observe(s));

// cursor glow
const glow = document.getElementById('glow');
document.addEventListener('mousemove', e => {
  glow.style.background =
    `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(224,120,138,.08), transparent 80%)`;
});