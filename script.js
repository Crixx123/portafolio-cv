/**
 * Cristian Miguel Hernández - Portafolio Personal
 * Lógica interactiva: navegación activa, validación y envío de formulario
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Año actual en el footer
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // 2. Navegación activa con IntersectionObserver
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${currentId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  // 3. Manejo del Formulario de Contacto
  const form = document.getElementById('contact-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const submitBtn = document.getElementById('submit-btn');
  const successMessage = document.getElementById('form-success');

  if (form) {
    // Limpieza de estados de error al escribir
    [nameInput, emailInput, messageInput].forEach(input => {
      input.addEventListener('input', () => {
        const group = input.closest('.form-group');
        if (group) {
          group.classList.remove('has-error');
        }
      });
    });

    const isValidEmail = (email) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      let hasError = false;

      // Validación de Nombre
      if (!nameInput.value.trim()) {
        nameInput.closest('.form-group').classList.add('has-error');
        hasError = true;
      } else {
        nameInput.closest('.form-group').classList.remove('has-error');
      }

      // Validación de Email
      if (!emailInput.value.trim() || !isValidEmail(emailInput.value.trim())) {
        emailInput.closest('.form-group').classList.add('has-error');
        hasError = true;
      } else {
        emailInput.closest('.form-group').classList.remove('has-error');
      }

      // Validación de Mensaje
      if (!messageInput.value.trim()) {
        messageInput.closest('.form-group').classList.add('has-error');
        hasError = true;
      } else {
        messageInput.closest('.form-group').classList.remove('has-error');
      }

      if (hasError) return;

      // Estado de envío
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>ENVIANDO...</span>';

      // Simular despacho rápido y exitoso
      setTimeout(() => {
        form.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;

        if (successMessage) {
          successMessage.style.display = 'flex';
          successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

          setTimeout(() => {
            successMessage.style.display = 'none';
          }, 6000);
        }
      }, 700);
    });
  }
});
