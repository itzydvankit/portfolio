// Mobile navigation toggle
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

// Close mobile nav after clicking a link
mainNav.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', false);
  });
});

// Highlight the current section's nav link while scrolling
const sections = document.querySelectorAll('main .section, .hero');
const navLinks = document.querySelectorAll('.nav-link');

const highlightNav = () => {
  let currentId = '';
  sections.forEach(section => {
    const top = section.offsetTop - 90;
    if (window.scrollY >= top) currentId = section.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
  });
};
window.addEventListener('scroll', highlightNav);
highlightNav();

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Scroll progress bar
const progressBar = document.getElementById('progressBar');
const updateProgress = () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = pct + '%';
};
window.addEventListener('scroll', updateProgress);
updateProgress();

// Scroll-reveal animation
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));