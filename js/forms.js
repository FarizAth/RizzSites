/* RizzSites — Contact form
   Real client-side validation. Submits to a configurable endpoint.
   Never fakes a successful submission — if no endpoint is configured,
   or the request fails, the person is told plainly and pointed to email. */

/* Set this to your form backend (Netlify Forms, Formspree, or your own
   serverless function at /api/contact) once one is deployed. */
const CONTACT_ENDPOINT = '';

const REQUIRED_FIELDS = ['name', 'email', 'need', 'budget'];

function validateField(field){
  const value = field.value.trim();
  const wrapper = field.closest('.field');
  let valid = true;

  if(field.hasAttribute('required') && !value){
    valid = false;
  }
  if(valid && field.type === 'email' && value){
    valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  if(wrapper) wrapper.classList.toggle('has-error', !valid);
  return valid;
}

function setStatus(statusEl, type, message){
  statusEl.className = `form-status is-visible is-${type}`;
  statusEl.textContent = message;
  statusEl.setAttribute('role', type === 'error' ? 'alert' : 'status');
}

export function initContactForm(){
  const form = document.getElementById('contactForm');
  if(!form) return;

  const statusEl = document.getElementById('formStatus');
  const submitBtn = form.querySelector('[type="submit"]');
  const fields = Array.from(form.querySelectorAll('input, textarea, select'));

  fields.forEach(field => {
    field.addEventListener('blur', () => validateField(field));
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const requiredEls = fields.filter(f => REQUIRED_FIELDS.includes(f.name));
    const allValid = requiredEls.map(validateField).every(Boolean);

    if(!allValid){
      setStatus(statusEl, 'error', 'A few required fields still need attention above.');
      const firstInvalid = form.querySelector('.has-error input, .has-error select, .has-error textarea');
      firstInvalid?.focus();
      return;
    }

    if(!CONTACT_ENDPOINT){
      setStatus(
        statusEl,
        'error',
        'This form isn\u2019t connected to a backend yet. Email hello@rizzsites.com directly and we\u2019ll get back to you.'
      );
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending\u2026';

    try{
      const data = Object.fromEntries(new FormData(form).entries());
      const res = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if(!res.ok) throw new Error('Request failed');

      setStatus(statusEl, 'success', 'Thanks \u2014 your project details are in. We\u2019ll reply within one business day.');
      form.reset();
    } catch (err){
      setStatus(
        statusEl,
        'error',
        'Something went wrong sending this. Email hello@rizzsites.com directly and we\u2019ll pick it up from there.'
      );
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Start a Project';
    }
  });
}
