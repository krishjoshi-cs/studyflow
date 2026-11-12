// Small interactions for the StudyFlow landing page.
const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

// Open and close the mobile navigation, then close it after a section is chosen.
menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  navLinks.classList.toggle('open', !isOpen);
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
  });
});

const form = document.querySelector('#demo-form');
const message = document.querySelector('#form-message');
const nameField = document.querySelector('#name');
const emailField = document.querySelector('#email');

function showError(field, text) {
  field.setAttribute('aria-invalid', text ? 'true' : 'false');
  document.querySelector(`#${field.id}-error`).textContent = text;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  message.classList.remove('visible');
  let isValid = true;

  if (nameField.value.trim().length < 2) {
    showError(nameField, 'Please enter at least 2 characters.');
    isValid = false;
  } else showError(nameField, '');

  if (!emailField.validity.valid || !emailField.value.trim()) {
    showError(emailField, 'Please enter a valid email address.');
    isValid = false;
  } else showError(emailField, '');

  if (!isValid) {
    form.querySelector('[aria-invalid="true"]').focus();
    return;
  }

  const firstName = nameField.value.trim().split(/\s+/)[0];
  message.textContent = `Thanks, ${firstName}! The demo form is working. This preview does not send or store your details.`;
  message.classList.add('visible');
  form.reset();
});

// Clear a field's message as soon as the visitor corrects it.
[nameField, emailField].forEach((field) => {
  field.addEventListener('input', () => {
    if (field.id === 'name' && field.value.trim().length >= 2) showError(field, '');
    if (field.id === 'email' && field.validity.valid) showError(field, '');
  });
});

document.querySelector('#year').textContent = new Date().getFullYear();
