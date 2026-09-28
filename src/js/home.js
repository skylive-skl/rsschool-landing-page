import '../scss/main.scss';
import { initTheme } from './theme.js';
import { initBurger } from './burger.js';
import { initSlider } from './slider.js';

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initBurger();
  initSlider(document.querySelector('.favorite__slider'));
});
