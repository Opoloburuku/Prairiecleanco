/* Prairie Clean Co. — app.js */

/* ── Scroll reveal ── */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('visible');
    revealObs.unobserve(e.target);
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => revealObs.observe(el));

/* ── Service cards → booking ── */
document.querySelectorAll('.svc-card, .svc-link').forEach(el => {
  el.addEventListener('click', () =>
    document.getElementById('booking').scrollIntoView({ behavior: 'smooth' })
  );
  el.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* ── Toast ── */
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 4200);
}

/* ── Nav: deepen shadow on scroll ── */
const navEl = document.querySelector('.site-nav');
if (navEl) {
  window.addEventListener('scroll', () => {
    navEl.style.boxShadow = window.scrollY > 20
      ? '0 4px 24px rgba(15,92,140,.15), 0 1px 6px rgba(0,0,0,.06)'
      : '0 2px 16px rgba(15,92,140,.1)';
  }, { passive: true });
}

/* ── Logo keyboard nav ── */
const logoEl = document.querySelector('.logo');
if (logoEl) {
  logoEl.addEventListener('keydown', e => {
    if (e.key === 'Enter') window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ── Mobile nav menu ── */
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
if (navToggle && mobileMenu) {
  const closeMenu = () => {
    navToggle.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('open');
  };
  const openMenu = () => {
    navToggle.setAttribute('aria-expanded', 'true');
    mobileMenu.classList.add('open');
  };

  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    isOpen ? closeMenu() : openMenu();
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });
}
