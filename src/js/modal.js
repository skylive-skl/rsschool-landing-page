/**
 * Product modal: opens from a menu card and shows the same product object.
 */

import products from '../data/products.json';
import { lockScroll, unlockScroll } from './scroll-lock.js';

const toCents = (value) => Math.round(parseFloat(value) * 100);
const formatPrice = (cents) => `$${(cents / 100).toFixed(2)}`;

function createOption({ type, name, value, marker, text, checked }) {
  const label = document.createElement('label');
  label.className = 'modal__option';

  const input = document.createElement('input');
  input.className = 'modal__option-input';
  input.type = type;
  input.name = name;
  input.value = value;
  input.checked = checked;

  const button = document.createElement('span');
  button.className = 'button button--tag modal__option-btn';

  const icon = document.createElement('span');
  icon.className = 'button__icon';
  icon.textContent = marker;

  const caption = document.createElement('span');
  caption.className = 'button__text';
  caption.textContent = text;

  button.append(icon, caption);
  label.append(input, button);
  return label;
}

function createGroup(title, options) {
  const fieldset = document.createElement('fieldset');
  fieldset.className = 'modal__group';

  const legend = document.createElement('legend');
  legend.className = 'modal__group-title';
  legend.textContent = title;

  const list = document.createElement('div');
  list.className = 'modal__group-list';
  list.append(...options.map(createOption));

  fieldset.append(legend, list);
  return fieldset;
}

export function initModal() {
  const grid = document.querySelector('.menu__grid');
  const modal = document.querySelector('#product-modal');
  if (!grid || !modal) return;

  const imageBox = modal.querySelector('.modal__image-box');
  const title = modal.querySelector('.modal__title');
  const description = modal.querySelector('.modal__description');
  const options = modal.querySelector('.modal__options');
  const price = modal.querySelector('.modal__price');
  const closeBtn = modal.querySelector('.modal__close');

  let currentProduct = null;

  function updateTotal() {
    if (!currentProduct) return;

    const sizeKey = options.querySelector('input[name="size"]:checked')?.value;
    const sizeCents = toCents(currentProduct.sizes[sizeKey]?.['add-price'] ?? 0);
    const additivesCents = [...options.querySelectorAll('input[name="additives"]:checked')].reduce(
      (sum, input) => sum + toCents(currentProduct.additives[Number(input.value)]['add-price']),
      0
    );

    price.textContent = formatPrice(toCents(currentProduct.price) + sizeCents + additivesCents);
  }

  // Options are rebuilt from the product on every open, so they start from the initial state
  function renderOptions(product) {
    const sizeOptions = Object.entries(product.sizes).map(([key, { size }], index) => ({
      type: 'radio',
      name: 'size',
      value: key,
      marker: key.toUpperCase(),
      text: size,
      checked: index === 0,
    }));

    const additiveOptions = product.additives.map((additive, index) => ({
      type: 'checkbox',
      name: 'additives',
      value: String(index),
      marker: String(index + 1),
      text: additive.name,
      checked: false,
    }));

    options.replaceChildren(createGroup('Size', sizeOptions), createGroup('Additives', additiveOptions));
  }

  function fillModal(product) {
    const image = document.createElement('img');
    image.className = 'modal__image';
    image.src = product.image;
    image.alt = product.name;
    imageBox.replaceChildren(image);

    title.textContent = product.name;
    description.textContent = product.description;

    currentProduct = product;
    renderOptions(product);
    updateTotal();
  }

  function openModal(id) {
    const product = products[Number(id)];
    if (!product || modal.open) return;

    fillModal(product);
    modal.showModal();
    lockScroll();
  }

  options.addEventListener('change', updateTotal);

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
