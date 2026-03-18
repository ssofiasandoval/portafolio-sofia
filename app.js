/* ============================================================
   PORTAFOLIO — SOFÍA SANDOVAL — app.js
   ============================================================ */

// 1. CURSOR PERSONALIZADO
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', function(e) {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
});
document.querySelectorAll('a, button, .proyecto-card').forEach(function(el) {
  el.addEventListener('mouseenter', function() { cursor.classList.add('expand'); });
  el.addEventListener('mouseleave', function() { cursor.classList.remove('expand'); });
});

// 2. MENÚ HAMBURGUESA
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}
document.addEventListener('click', function(e) {
  const menu = document.getElementById('mobileMenu');
  const hamburger = document.querySelector('.hamburger');
  if (!menu.contains(e.target) && !hamburger.contains(e.target)) {
    menu.classList.remove('open');
  }
});

// 3. MODALES
function openModal(id) {
  document.getElementById('modal-' + id).classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal(id) {
  document.getElementById('modal-' + id).classList.remove('open');
  document.body.style.overflow = '';
}
function closeModalOnBg(event) {
  if (event.target.classList.contains('modal-overlay')) {
    event.target.classList.remove('open');
    document.body.style.overflow = '';
  }
}
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(function(m) {
      m.classList.remove('open');
      document.body.style.overflow = '';
    });
  }
});

// 4. ANIMACIONES AL SCROLL
const observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });
document.querySelectorAll('.fade-up').forEach(function(el) { observer.observe(el); });

// 5. FORMULARIO CON FORMSPREE
// ⚠️ Reemplaza TUCODIGO con el código que te da formspree.io
function enviarMensaje() {
  const btn     = document.querySelector('.btn-send');
  const nombre  = document.querySelector('.contacto-form input[type="text"]');
  const correo  = document.querySelector('.contacto-form input[type="email"]');
  const mensaje = document.querySelector('.contacto-form textarea');

  // Validación
  if (!nombre.value || !correo.value || !mensaje.value) {
    btn.textContent = 'Completa todos los campos';
    btn.style.background = '#e05252';
    setTimeout(function() {
      btn.textContent = 'Enviar mensaje →';
      btn.style.background = '';
    }, 2500);
    return;
  }

  // Enviando...
  btn.textContent = 'Enviando...';
  btn.disabled = true;

  fetch('https://formspree.io/f/xgonrnvp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nombre:  nombre.value,
      email:   correo.value,
      mensaje: mensaje.value
    })
  })
  .then(function(res) {
    if (res.ok) {
      btn.textContent = '¡Enviado! ✓';
      btn.style.background = '#4CAF50';
      nombre.value = ''; correo.value = ''; mensaje.value = '';
    } else {
      btn.textContent = 'Error, intenta de nuevo';
      btn.style.background = '#e05252';
    }
  })
  .catch(function() {
    btn.textContent = 'Error de conexión';
    btn.style.background = '#e05252';
  })
  .finally(function() {
    btn.disabled = false;
    setTimeout(function() {
      btn.textContent = 'Enviar mensaje →';
      btn.style.background = '';
    }, 3000);
  });
}

// 6. NAV ACTIVO AL SCROLL
const secciones = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', function() {
  let actual = '';
  secciones.forEach(function(s) {
    if (window.scrollY >= s.offsetTop - 100) actual = s.getAttribute('id');
  });
  navLinks.forEach(function(link) {
    link.style.color = '';
    if (link.getAttribute('href') === '#' + actual) link.style.color = 'var(--coral)';
  });
});