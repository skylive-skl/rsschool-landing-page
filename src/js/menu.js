import '../scss/main.scss';
import { initTheme } from './theme.js';
import { initBurger } from './burger.js';
import { initCatalog } from './catalog.js';
import { initModal } from './modal.js';

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initBurger();
  initCatalog();
  initModal();
});
