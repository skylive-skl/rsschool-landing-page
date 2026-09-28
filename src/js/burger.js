/**
 * Burger menu for tablet and mobile widths (768px and below).
 */

import { lockScroll, unlockScroll } from './scroll-lock.js';

const DESKTOP_QUERY = '(min-width: 769px)';

export function initBurger() {
  const header = document.querySelector('.header');
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.header__nav');
  if (!header || !burger || !nav) return;

  let isOpen = false;

  // The menu fills the space under the header, which may be partially scrolled out of view
  function updateHeaderOffset() {
    const { bottom } = header.getBoundingClientRect();
    document.documentElement.style.setProperty('--header-height', `${Math.max(bottom, 0)}px`);
  }

  function openMenu() {
    if (isOpen) return;
    isOpen = true;
    updateHeaderOffset();
    nav.classList.add('is-open');
    burger.classList.add('is-open');
    burger.setAttribute('aria-expanded', 'true');
    burger.setAttribute('aria-label', 'Close navigation menu');
    lockScroll();
  }

  function closeMenu() {
    if (!isOpen) return;
    isOpen = false;
    nav.classList.remove('is-open');
    burger.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Open navigation menu');
    unlockScroll();
  }

  burger.addEventListener('click', () => {
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  nav.addEventListener('click', (event) => {
    if (event.target.closest('.nav__link')) closeMenu();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  window.matchMedia(DESKTOP_QUERY).addEventListener('change', (event) => {
    if (event.matches) closeMenu();
  });

  window.addEventListener('resize', () => {
    if (isOpen) updateHeaderOffset();
  });
}
