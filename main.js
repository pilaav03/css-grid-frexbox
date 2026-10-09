const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');
const themeButton = document.querySelector('.theme-toggle');
const filterButtons = document.querySelectorAll('.filter-button');
const projectCards = document.querySelectorAll('.project-card');
const dialog = document.querySelector('.project-dialog');
const dialogTitle = document.querySelector('#dialog-title');
const closeDialog = document.querySelector('.dialog-close');
const form = document.querySelector('.contact-form');
const statusMessage = document.querySelector('.form-status');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 12);
});

menuButton.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

themeButton.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const darkMode = document.body.classList.contains('dark');
  themeButton.setAttribute('aria-label', darkMode ? 'Uključi svijetlu temu' : 'Uključi tamnu temu');
});

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');

    projectCards.forEach((card) => {
      const visible = button.dataset.filter === 'all' || card.dataset.category === button.dataset.filter;
      card.classList.toggle('hidden', !visible);
    });
  });
});

function openProject(card) {
  dialogTitle.textContent = card.querySelector('h3').textContent;
  if (typeof dialog.showModal === 'function') dialog.showModal();
}

projectCards.forEach((card) => {
  card.addEventListener('click', () => openProject(card));
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openProject(card);
    }
  });
});

closeDialog.addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const requiredFields = form.querySelectorAll('[required]');
  let valid = true;

  requiredFields.forEach((field) => {
    const fieldValid = field.type === 'checkbox' ? field.checked : field.checkValidity();
    field.classList.toggle('invalid', !fieldValid);
    valid = valid && fieldValid;
  });

  statusMessage.textContent = valid
    ? 'Forma je ispravno popunjena. U demonstracijskoj verziji podaci se ne šalju.'
    : 'Provjerite obavezna polja prije slanja.';
});
