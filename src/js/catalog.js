/**
 * Menu catalog: renders product cards from the products data.
 */

import products from '../data/products.json';

const MOBILE_QUERY = '(max-width: 768px)';
const MOBILE_INITIAL_COUNT = 4;

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
  const panel = document.querySelector('.menu__tabpanel');
  const tabs = [...document.querySelectorAll('.tabs__btn[data-category]')];
  const loadMoreBtn = document.querySelector('.menu__load-more');
  const mobileQuery = window.matchMedia(MOBILE_QUERY);
  if (!grid || !tabs.length) return;

  const state = {
    category: tabs[0].dataset.category,
    expanded: false,
  };

  function renderTabs() {
    tabs.forEach((tab) => {
      const isActive = tab.dataset.category === state.category;
      tab.classList.toggle('is-active', isActive);
      tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
      if (isActive) panel?.setAttribute('aria-labelledby', tab.id);
    });
  }

  function renderCards() {
    const cards = products
      .map((product, id) => ({ product, id }))
      .filter(({ product }) => product.category === state.category)
      .map(({ product, id }) => createCard(product, id));

    grid.replaceChildren(...cards);
    updateVisibility();
  }

  // On tablet and mobile only the first cards are shown until "load more" is pressed
  function updateVisibility() {
    const items = [...grid.children];
    const limit = mobileQuery.matches && !state.expanded ? MOBILE_INITIAL_COUNT : items.length;

    items.forEach((item, index) => {
      item.hidden = index >= limit;
    });

    loadMoreBtn?.classList.toggle('is-visible', items.length > limit);
  }

  function setCategory(category) {
    if (category === state.category) return;
    state.category = category;
    state.expanded = false;
    renderTabs();
    renderCards();
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => setCategory(tab.dataset.category));
  });

  loadMoreBtn?.addEventListener('click', () => {
    state.expanded = true;
    updateVisibility();
  });

  mobileQuery.addEventListener('change', updateVisibility);

  renderTabs();
  renderCards();
}
