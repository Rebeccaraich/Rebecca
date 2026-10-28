/**
 * Rebecca Raich - Feminine Minimal Editorial Theme
 * Falling Grey Feathers & Sparkles Animation Canvas + Interactive Controls
 */

document.addEventListener('DOMContentLoaded', () => {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const lightswitchDemo = document.getElementById('lightswitch-demo');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');
  const htmlRoot = document.documentElement;

  // ==========================================================================
  // 1. Theme Management (Default: Minimal Pure White)
  // ==========================================================================
  const savedTheme = localStorage.getItem('site-theme') || 'light';
  setTheme(savedTheme);

  function setTheme(theme) {
    if (theme === 'dark') {
      htmlRoot.setAttribute('data-theme', 'dark');
      updateThemeIcon(true);
    } else {
      htmlRoot.removeAttribute('data-theme');
      updateThemeIcon(false);
    }
    localStorage.setItem('site-theme', theme);
  }

  function toggleTheme() {
    const isCurrentlyDark = htmlRoot.getAttribute('data-theme') === 'dark';
    const newTheme = isCurrentlyDark ? 'light' : 'dark';
    setTheme(newTheme);
  }

  function updateThemeIcon(isDark) {
    const iconContainer = document.getElementById('theme-icon');
    if (!iconContainer) return;

    if (isDark) {
      // Sun icon when in dark mode (click to switch back to white)
      iconContainer.innerHTML = `
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      `;
    } else {
      // Moon icon when in light mode (click to switch to dark)
      iconContainer.innerHTML = `
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      `;
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }

  // Interactive Mood Switch Orb in About section
  if (lightswitchDemo) {
    lightswitchDemo.addEventListener('click', () => {
      toggleTheme();
      lightswitchDemo.style.transform = 'scale(0.92)';
      setTimeout(() => {
        lightswitchDemo.style.transform = '';
      }, 180);
    });
  }

  // ==========================================================================
  // 2. Mobile Navigation Toggle
  // ==========================================================================
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }

  // ==========================================================================
  // 3. Falling Grey Feathers & Sparkles Background Canvas
  // ==========================================================================
  const canvas = document.getElementById('ambient-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let dpr = 1;
    let animationFrameId = null;
    let isRunning = true;

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }

    window.addEventListener('resize', resize, { passive: true });
    resize();

    // Feather particle generator
    const featherCount = Math.max(14, Math.min(24, Math.floor(width / 75)));
    const feathers = [];

    for (let i = 0; i < featherCount; i++) {
      feathers.push({
        x: Math.random() * width,
        y: Math.random() * height * 1.5 - height * 0.5,
        length: 32 + Math.random() * 32,
        speedY: 0.35 + Math.random() * 0.55,
        speedX: -0.15 + Math.random() * 0.3,
        swayPhase: Math.random() * Math.PI * 2,
        swaySpeed: 0.012 + Math.random() * 0.016,
        swayAmplitude: 24 + Math.random() * 32,
        angle: (Math.random() - 0.5) * 0.4,
        angleDrift: (Math.random() - 0.5) * 0.003,
        opacity: 0.22 + Math.random() * 0.28,
        curveBend: 0.15 + Math.random() * 0.15,
        widthScale: 0.18 + Math.random() * 0.06
      });
    }

    // Sparkle particle generator
    const sparkleCount = Math.max(18, Math.min(32, Math.floor(width / 60)));
    const sparkles = [];

    for (let i = 0; i < sparkleCount; i++) {
      sparkles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 3.5 + Math.random() * 5.5,
        speedY: 0.12 + Math.random() * 0.28,
        speedX: -0.08 + Math.random() * 0.16,
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.025 + Math.random() * 0.045,
        baseOpacity: 0.25 + Math.random() * 0.45
      });
    }

    // Helper: Draw single curved feather
    function drawFeather(f) {
      ctx.save();
      ctx.translate(f.x, f.y);
      ctx.rotate(f.angle);
      ctx.globalAlpha = f.opacity;

      const len = f.length;
      const w = len * f.widthScale;
      const bend = f.curveBend * len;

      const isDark = htmlRoot.getAttribute('data-theme') === 'dark';
      const quillColor = isDark ? 'rgba(190, 190, 202, 0.65)' : 'rgba(125, 125, 136, 0.55)';
      const vaneColorL = isDark ? 'rgba(175, 175, 188, 0.28)' : 'rgba(165, 165, 175, 0.28)';
      const vaneColorR = isDark ? 'rgba(195, 195, 208, 0.24)' : 'rgba(185, 185, 195, 0.22)';
      const barbColor = isDark ? 'rgba(215, 215, 225, 0.18)' : 'rgba(145, 145, 155, 0.18)';

      // Quill (shaft)
      ctx.beginPath();
      ctx.moveTo(0, -len * 0.5);
      ctx.quadraticCurveTo(bend * 0.5, 0, 0, len * 0.5);
      ctx.strokeStyle = quillColor;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Left vane
      ctx.beginPath();
      ctx.moveTo(0, -len * 0.48);
      ctx.bezierCurveTo(-w * 1.1, -len * 0.2, -w * 0.9, len * 0.18, 0, len * 0.44);
      ctx.fillStyle = vaneColorL;
      ctx.fill();

      // Right vane
      ctx.beginPath();
      ctx.moveTo(0, -len * 0.48);
      ctx.bezierCurveTo(w * 1.05, -len * 0.18, w * 0.85, len * 0.22, 0, len * 0.44);
      ctx.fillStyle = vaneColorR;
      ctx.fill();

      // Soft barb line textures
      ctx.strokeStyle = barbColor;
      ctx.lineWidth = 0.5;
      for (let pos = -0.35; pos <= 0.35; pos += 0.12) {
        const startY = len * pos;
        ctx.beginPath();
        ctx.moveTo(0, startY);
        ctx.lineTo(-w * 0.65, startY - len * 0.05);
        ctx.moveTo(0, startY);
        ctx.lineTo(w * 0.65, startY - len * 0.05);
        ctx.stroke();
      }

      ctx.restore();
    }

    // Helper: Draw 4-point star sparkle
    function drawSparkle(s) {
      const currentOpacity = s.baseOpacity * (0.35 + 0.65 * Math.sin(s.twinklePhase));
      if (currentOpacity <= 0.02) return;

      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.globalAlpha = Math.max(0, Math.min(1, currentOpacity));

      const isDark = htmlRoot.getAttribute('data-theme') === 'dark';
      const starColor = isDark ? 'rgba(235, 235, 245, 0.85)' : 'rgba(150, 150, 160, 0.75)';
      const centerGlow = isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.9)';

      const sz = s.size;
      ctx.fillStyle = starColor;
      ctx.beginPath();
      ctx.moveTo(0, -sz);
      ctx.quadraticCurveTo(0, 0, sz, 0);
      ctx.quadraticCurveTo(0, 0, 0, sz);
      ctx.quadraticCurveTo(0, 0, -sz, 0);
      ctx.quadraticCurveTo(0, 0, 0, -sz);
      ctx.fill();

      // Center bright glint
      ctx.beginPath();
      ctx.arc(0, 0, sz * 0.3, 0, Math.PI * 2);
      ctx.fillStyle = centerGlow;
      ctx.fill();

      ctx.restore();
    }

    // Animation Render Loop
    function render() {
      if (!isRunning) return;

      ctx.clearRect(0, 0, width, height);

      // Render & update sparkles
      for (let i = 0; i < sparkles.length; i++) {
        const s = sparkles[i];
        drawSparkle(s);

        if (!prefersReducedMotion) {
          s.y += s.speedY;
          s.x += s.speedX;
          s.twinklePhase += s.twinkleSpeed;

          if (s.y > height + 20) {
            s.y = -20;
            s.x = Math.random() * width;
          }
          if (s.x > width + 20) s.x = -20;
          if (s.x < -20) s.x = width + 20;
        }
      }

      // Render & update feathers
      for (let i = 0; i < feathers.length; i++) {
        const f = feathers[i];
        drawFeather(f);

        if (!prefersReducedMotion) {
          f.y += f.speedY;
          f.swayPhase += f.swaySpeed;
          f.x += Math.sin(f.swayPhase) * (f.swayAmplitude * 0.02) + f.speedX;
          f.angle = Math.sin(f.swayPhase) * 0.32;

          if (f.y > height + 60) {
            f.y = -60;
            f.x = Math.random() * width;
          }
          if (f.x > width + 60) f.x = -60;
          if (f.x < -60) f.x = width + 60;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    }

    render();

    // Pause animation when tab is inactive to save resources
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        isRunning = false;
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
      } else {
        isRunning = true;
        render();
      }
    });
  }

  // ==========================================================================
  // 4. Delicate Card Hover Parallax
  // ==========================================================================
  const cards = document.querySelectorAll('.project-card, .hero-card-frame');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      // Do not tilt card when interacting with the 3D model viewer
      if (e.target.closest('model-viewer') || e.target.closest('.model-container')) {
        card.style.transform = '';
        return;
      }

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -2.5;
      const rotateY = ((x - centerX) / centerX) * 2.5;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ==========================================================================
  // 5. Artwork Lightbox Modal
  // ==========================================================================
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxOverlay = document.getElementById('lightbox-overlay');
  const lightboxClose = document.getElementById('lightbox-close');
  const triggerElements = [
    document.getElementById('project-1-preview'),
    document.getElementById('btn-expand-1')
  ].filter(Boolean);

  function openLightbox() {
    if (pdfModal && pdfModal.classList.contains('active')) {
      closePdfModal();
    }
    if (!lightboxModal) return;
    lightboxModal.classList.add('active');
    lightboxModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('active');
    lightboxModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  triggerElements.forEach(el => {
    el.addEventListener('click', openLightbox);
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox();
      }
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightboxOverlay) {
    lightboxOverlay.addEventListener('click', closeLightbox);
  }

  // ==========================================================================
  // 6. Interactive In-Page PDF Modal Viewer
  // ==========================================================================
  const pdfModal = document.getElementById('pdf-modal');
  const pdfOverlay = document.getElementById('pdf-overlay');
  const pdfClose = document.getElementById('pdf-close');
  const pdfTriggerElements = [
    document.getElementById('btn-preview-pdf'),
    document.getElementById('btn-pdf-hero'),
    document.getElementById('modal-open-pdf-btn')
  ].filter(Boolean);

  function openPdfModal() {
    if (lightboxModal && lightboxModal.classList.contains('active')) {
      closeLightbox();
    }
    if (!pdfModal) return;
    pdfModal.classList.add('active');
    pdfModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closePdfModal() {
    if (!pdfModal) return;
    pdfModal.classList.remove('active');
    pdfModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  pdfTriggerElements.forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      openPdfModal();
    });
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openPdfModal();
      }
    });
  });

  if (pdfClose) {
    pdfClose.addEventListener('click', closePdfModal);
  }

  if (pdfOverlay) {
    pdfOverlay.addEventListener('click', closePdfModal);
  }

  // Close modals on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (lightboxModal && lightboxModal.classList.contains('active')) {
        closeLightbox();
      }
      if (pdfModal && pdfModal.classList.contains('active')) {
        closePdfModal();
      }
    }
  });

  // ==========================================================================
  // 7. Project 2 - 3D Model Viewer Controls
  // ==========================================================================
  const modelViewer2 = document.getElementById('project-2-viewer');
  const btnResetCamera = document.getElementById('btn-reset-camera-2');
  const btnToggleRotate = document.getElementById('btn-toggle-rotate-2');
  const rotateLabel = document.getElementById('rotate-label-2');

  if (modelViewer2) {
    if (btnResetCamera) {
      btnResetCamera.addEventListener('click', () => {
        modelViewer2.cameraOrbit = '0deg 75deg 105%';
        modelViewer2.cameraTarget = 'auto auto auto';
        modelViewer2.fieldOfView = 'auto';
        if (typeof modelViewer2.resetTurntableRotation === 'function') {
          modelViewer2.resetTurntableRotation();
        }
      });
    }

    if (btnToggleRotate) {
      btnToggleRotate.addEventListener('click', () => {
        const isRotating = modelViewer2.hasAttribute('auto-rotate');
        if (isRotating) {
          modelViewer2.removeAttribute('auto-rotate');
          if (rotateLabel) rotateLabel.textContent = 'Spin Model';
          btnToggleRotate.innerHTML = `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
            <span id="rotate-label-2">Spin Model</span>
          `;
        } else {
          modelViewer2.setAttribute('auto-rotate', '');
          if (rotateLabel) rotateLabel.textContent = 'Pause Spin';
          btnToggleRotate.innerHTML = `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="10" y1="15" x2="10" y2="9"></line>
              <line x1="14" y1="15" x2="14" y2="9"></line>
            </svg>
            <span id="rotate-label-2">Pause Spin</span>
          `;
        }
      });
    }
  }
});
