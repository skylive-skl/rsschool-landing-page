/**
 * Menu catalog: renders product cards from the products data.
 */

import products from '../data/products.json';

function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

// `id` is the product's index in the data array, so the modal can find the same object
function createCard(product, id) {
  const item = createElement('li', 'menu__item');

  const card = createElement('article', 'card');
  card.tabIndex = 0;
  card.dataset.id = String(id);

  const imageBox = createElement('div', 'card__image-box');
  const image = createElement('img', 'card__image');
  image.src = product.image;
  image.alt = product.name;
  image.loading = 'lazy';
  imageBox.append(image);

  const content = createElement('div', 'card__content');
  const info = createElement('div', 'card__info');
  info.append(
    createElement('h2', 'card__title', product.name),
    createElement('p', 'card__description', product.description)
  );
  content.append(info, createElement('p', 'card__price', `$${product.price}`));

  card.append(imageBox, content);
  item.append(card);
  return item;
}

export function initCatalog() {
  const grid = document.querySelector('.menu__grid');
  if (!grid) return;

  const category = 'coffee';

  const cards = products
    .map((product, id) => ({ product, id }))
    .filter(({ product }) => product.category === category)
    .map(({ product, id }) => createCard(product, id));

  grid.replaceChildren(...cards);
}
