/**
 * Product modal: opens from a menu card and shows the same product object.
 */

import products from '../data/products.json';
import { lockScroll, unlockScroll } from './scroll-lock.js';

export function initModal() {
  const grid = document.querySelector('.menu__grid');
  const modal = document.querySelector('#product-modal');
  if (!grid || !modal) return;

  const imageBox = modal.querySelector('.modal__image-box');
  const title = modal.querySelector('.modal__title');
  const description = modal.querySelector('.modal__description');
  const price = modal.querySelector('.modal__price');
  const closeBtn = modal.querySelector('.modal__close');

  function fillModal(product) {
    const image = document.createElement('img');
    image.className = 'modal__image';
    image.src = product.image;
    image.alt = product.name;
    imageBox.replaceChildren(image);

    title.textContent = product.name;
    description.textContent = product.description;
    price.textContent = `$${product.price}`;
  }

  function openModal(id) {
    const product = products[Number(id)];
    if (!product || modal.open) return;

    fillModal(product);
    modal.showModal();
    lockScroll();
  }

  // Covers every way of closing: button, backdrop and Escape
  modal.addEventListener('close', unlockScroll);

  closeBtn?.addEventListener('click', () => modal.close());

  // The dialog itself is only the target when the backdrop is clicked
  modal.addEventListener('click', (event) => {
    if (event.target === modal) modal.close();
  });

  grid.addEventListener('click', (event) => {
    const card = event.target.closest('.card');
    if (card) openModal(card.dataset.id);
  });

  grid.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    const card = event.target.closest('.card');
    if (!card) return;
    event.preventDefault();
    openModal(card.dataset.id);
  });
}
