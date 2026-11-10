const links = [...document.querySelectorAll('.nav-link')];
// only track sections that actually have a nav link
const sections = links
  .map(l => document.querySelector(l.getAttribute('href')))
  .filter(Boolean);

let locked = false;
let lockTimer;

function setActive(id) {
  links.forEach(l => {
    l.dataset.active = String(l.getAttribute('href') === '#' + id);
  });
}

function update() {
  if (locked) return;
  const atBottom =
    window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
  let current = sections[0].id;
  for (const s of sections) {
    if (s.getBoundingClientRect().top <= window.innerHeight * 0.35) current = s.id;
  }
  if (atBottom) current = sections[sections.length - 1].id;
  setActive(current);
}

window.addEventListener('scroll', update, { passive: true });
window.addEventListener('resize', update);
update();

// instant highlight on click, ignoring scroll updates while the smooth scroll runs
links.forEach(l => {
  l.addEventListener('click', () => {
    setActive(l.getAttribute('href').slice(1));
    locked = true;
    clearTimeout(lockTimer);
    lockTimer = setTimeout(() => { locked = false; update(); }, 900);
  });
});

// cursor glow
const glow = document.getElementById('glow');
document.addEventListener('mousemove', e => {
  glow.style.background =
    `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(224,120,138,.08), transparent 80%)`;
});