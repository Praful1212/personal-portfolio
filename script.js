/**
 * Praful Saxena - Portfolio Interactive Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Navigation Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('nav-open');
      const isOpen = navLinks.classList.contains('nav-open');
      mobileToggle.textContent = isOpen ? '✕' : '☰';
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking on any nav link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('nav-open');
        mobileToggle.textContent = '☰';
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 2. Active Nav Link on Scroll
  const sections = document.querySelectorAll('section[id]');
  const allNavLinks = document.querySelectorAll('.nav-link');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        allNavLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, {
    rootMargin: '-20% 0px -60% 0px'
  });

  sections.forEach(sec => navObserver.observe(sec));

  // 3. Animated Metric Counters
  const counterElements = document.querySelectorAll('.counter');
  let countersAnimated = false;

  const animateCounters = () => {
    counterElements.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const duration = 1800; // ms
      const startTime = performance.now();

      const updateCount = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // easeOutQuart
        const ease = 1 - Math.pow(1 - progress, 4);
        const currentVal = Math.floor(ease * target);
        
        counter.textContent = currentVal;

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          counter.textContent = target;
        }
      };

      requestAnimationFrame(updateCount);
    });
  };

  const metricsSection = document.querySelector('.impact-strip');
  if (metricsSection) {
    const metricsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countersAnimated) {
          countersAnimated = true;
          animateCounters();
          metricsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });

    metricsObserver.observe(metricsSection);
  }

  // 4. Resume Modal Handling
  const resumeModal = document.getElementById('resumeModal');
  const openResumeBtn = document.getElementById('openResumeModalBtn');
  const closeResumeBtn = document.getElementById('closeResumeModalBtn');

  const openModal = () => {
    if (resumeModal) {
      resumeModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeModal = () => {
    if (resumeModal) {
      resumeModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  if (openResumeBtn) openResumeBtn.addEventListener('click', openModal);
  if (closeResumeBtn) closeResumeBtn.addEventListener('click', closeModal);

  if (resumeModal) {
    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) closeModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && resumeModal && resumeModal.classList.contains('active')) {
      closeModal();
    }
  });

  // 5. Copy to Clipboard Utility
  const copyButtons = document.querySelectorAll('.copy-btn');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
      const text = btn.getAttribute('data-copy');
      if (!text) return;

      try {
        await navigator.clipboard.writeText(text);
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        btn.style.color = 'var(--emerald)';
        btn.style.borderColor = 'var(--emerald)';

        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.color = '';
          btn.style.borderColor = '';
        }, 2000);
      } catch (err) {
        console.warn('Clipboard copy error:', err);
      }
    });
  });

  // 6. Contact Form — Formspree AJAX Submission
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  const formSubmitBtn = document.getElementById('formSubmitBtn');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Show loading state
      const originalBtnContent = formSubmitBtn.innerHTML;
      formSubmitBtn.disabled = true;
      formSubmitBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation:spin 1s linear infinite"><circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle><path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path></svg>
        Sending…
      `;

      try {
        const formData = new FormData(contactForm);
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          // Success
          formStatus.style.display = 'block';
          formStatus.style.background = 'rgba(16, 185, 129, 0.15)';
          formStatus.style.border = '1px solid rgba(16, 185, 129, 0.4)';
          formStatus.style.color = '#34d399';
          formStatus.innerHTML = '✅ Message sent successfully! I\'ll get back to you soon.';
          contactForm.reset();
          formSubmitBtn.innerHTML = originalBtnContent;
          formSubmitBtn.disabled = false;

          // Auto-hide status after 6 seconds
          setTimeout(() => { formStatus.style.display = 'none'; }, 6000);
        } else {
          throw new Error('Server error');
        }
      } catch (err) {
        // Error fallback
        formStatus.style.display = 'block';
        formStatus.style.background = 'rgba(239, 68, 68, 0.12)';
        formStatus.style.border = '1px solid rgba(239, 68, 68, 0.35)';
        formStatus.style.color = '#f87171';
        formStatus.innerHTML = '⚠️ Couldn\'t send via form. Please <a href="mailto:prafulsaxena12@gmail.com" style="color:#f87171; text-decoration:underline;">email directly</a>.';
        formSubmitBtn.innerHTML = originalBtnContent;
        formSubmitBtn.disabled = false;
      }
    });
  }
});
