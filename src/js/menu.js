import '../scss/main.scss';
import { initTheme } from './theme.js';
import { initBurger } from './burger.js';
import { initCatalog } from './catalog.js';

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initBurger();
  initCatalog();
});
