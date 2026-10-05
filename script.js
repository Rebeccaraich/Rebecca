/**
 * Rebecca Raich - Interactive Features & Light Switch
 */

document.addEventListener('DOMContentLoaded', () => {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const lightswitchDemo = document.getElementById('lightswitch-demo');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');
  const htmlRoot = document.documentElement;

  // 1. Theme Management (Sleek Dark Mode <-> Vibrant Light Mode)
  const savedTheme = localStorage.getItem('site-theme') || 'dark';
  setTheme(savedTheme);

  function setTheme(theme) {
    if (theme === 'light') {
      htmlRoot.setAttribute('data-theme', 'light');
      updateThemeIcon(true);
    } else {
      htmlRoot.removeAttribute('data-theme');
      updateThemeIcon(false);
    }
    localStorage.setItem('site-theme', theme);
  }

  function toggleTheme() {
    const isCurrentlyLight = htmlRoot.getAttribute('data-theme') === 'light';
    const newTheme = isCurrentlyLight ? 'dark' : 'light';
    setTheme(newTheme);
  }

  function updateThemeIcon(isLight) {
    const iconContainer = document.getElementById('theme-icon');
    if (!iconContainer) return;
    
    if (isLight) {
      // Moon icon when in light mode (to switch back to dark)
      iconContainer.innerHTML = `
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      `;
    } else {
      // Sun icon when in dark mode (to switch to light)
      iconContainer.innerHTML = `
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      `;
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }

  // Interactive lightswitch demo orb
  if (lightswitchDemo) {
    lightswitchDemo.addEventListener('click', () => {
      toggleTheme();
      lightswitchDemo.style.transform = 'scale(0.92)';
      setTimeout(() => {
        lightswitchDemo.style.transform = '';
      }, 180);
    });
  }

  // 2. Mobile Navigation Menu Toggle
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    // Close menu when clicking outside or clicking a nav link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }

  // 3. Subtle 3D Card Hover Effect on Glass Cards
  const cards = document.querySelectorAll('.glass-card, .hero-card-frame');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
});
