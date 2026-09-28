import '../scss/main.scss';
import { initTheme } from './theme.js';
import { initBurger } from './burger.js';

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initBurger();
});
