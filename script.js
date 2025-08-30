// Script pour le menu mobile
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

// Gestion du thème (dark/light)
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;
const storedTheme = localStorage.getItem('theme');
if (storedTheme) {
  root.classList.toggle('dark', storedTheme === 'dark');
}
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isDark = !root.classList.contains('dark');
    root.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}

// Mise à jour automatique de l'année dans le footer
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Gestion du formulaire: feedback UX et support pour EmailJS (optionnel)
const form = document.getElementById('contactForm');
const msg = document.getElementById('formMsg');
if (form && msg) {
  form.addEventListener('submit', async (e) => {
    // Si EmailJS est activé (data-emailjs="true"), on intercepte la soumission et on utilise EmailJS
    if (form.dataset.emailjs === 'true') {
      e.preventDefault();
      msg.textContent = 'Envoi en cours…';
      try {
        // TODO: Remplir ces identifiants si vous choisissez EmailJS
        const SERVICE_ID = 'XXX';
        const TEMPLATE_ID = 'XXX';
        const PUBLIC_KEY = 'XXX';
        // Chargement dynamiquement EmailJS
        if (!window.emailjs) {
          await new Promise((resolve, reject) => {
            const s = document.createElement('script');
            s.src = 'https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js';
            s.onload = resolve;
            s.onerror = reject;
            document.head.appendChild(s);
          });
        }
        window.emailjs.init(PUBLIC_KEY);
        const payload = {
          name: form.name.value,
          email: form.email.value,
          message: form.message.value
        };
        await window.emailjs.send(SERVICE_ID, TEMPLATE_ID, payload);
        msg.textContent = 'Merci ! Votre message a bien été envoyé.';
        form.reset();
      } catch (err) {
        console.error(err);
        msg.textContent = 'Oups, une erreur est survenue. Réessayez plus tard.';
      }
    } else {
      // Sinon: comportement par défaut Formspree
      e.preventDefault();
      msg.textContent = 'Envoi en cours…';
      try {
        const formData = new FormData(form);
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });
        if (response.ok) {
          msg.textContent = 'Merci ! Votre message a bien été envoyé.';
          form.reset();
        } else {
          msg.textContent = 'Impossible d’envoyer le message. Vérifiez les champs.';
        }
      } catch (err) {
        msg.textContent = 'Oups, une erreur est survenue. Réessayez plus tard.';
      }
    }
  });
}