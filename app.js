document.addEventListener('DOMContentLoaded', () => {
  // Register ScrollTrigger Plugin
  gsap.registerPlugin(ScrollTrigger);
  
  // Initialize all animations and interactions
  initializeAnimations();
  initializeCounters();
  setupForms();
  initializeDarkModeToggle();
});

function initializeAnimations() {
  // Hero Section Animation
  gsap.from('.hero-content > *', {
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: 'power3.out'
  });

  // Scroll Animations for sections
  const animateOnScroll = gsap.utils.toArray('.section-header, .highlight-card, .info-card, .stat-card');
  
  animateOnScroll.forEach((element) => {
    gsap.from(element, {
      scrollTrigger: {
        trigger: element,
        start: 'top bottom-=100',
        toggleActions: 'play none none reverse'
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    });
  });
}

function initializeCounters() {
  // Animate stat numbers on scroll
  const stats = document.querySelectorAll('.stat-number');
  
  stats.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-value'));
    
    gsap.to(stat, {
      scrollTrigger: {
        trigger: stat,
        start: 'top bottom-=100',
        once: true
      },
      textContent: target,
      duration: 2,
      snap: { textContent: 1 },
      ease: 'power1.inOut'
    });
  });
}

function setupForms() {
  // Handle contact form submission
  document.getElementById('contactForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    // Add form submission logic here
    console.log('Contact form submitted');
  });

  // Handle quote form submission
  document.getElementById('quoteForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    // Add form submission logic here
    console.log('Quote form submitted');
  });
}

// Add dark/light mode functionality
function initializeDarkModeToggle() {
  const darkModeToggle = document.getElementById('darkModeToggle');
  const body = document.body;
  
  // Check for saved user preference, first in localStorage, then prefers-color-scheme
  const darkModePref = localStorage.getItem('darkMode') || 
    window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Set initial state
  body.classList.toggle('light-mode', !darkModePref);
  darkModeToggle.checked = !darkModePref;

  darkModeToggle.addEventListener('change', (e) => {
    body.classList.toggle('light-mode', e.target.checked);
    localStorage.setItem('darkMode', (!e.target.checked).toString());
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});