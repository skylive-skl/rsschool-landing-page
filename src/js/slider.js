/**
 * Favorite coffee slider: arrows, indicators and swipe, with cyclic switching.
 */

const SWIPE_THRESHOLD = 50;

export function initSlider(root) {
  if (!root) return;

  const track = root.querySelector('.slider__track');
  const viewport = root.querySelector('.slider__viewport');
  const slides = [...root.querySelectorAll('.slider__slide')];
  const indicators = [...root.querySelectorAll('.slider__indicator')];
  const prevBtn = root.querySelector('.slider__btn--prev');
  const nextBtn = root.querySelector('.slider__btn--next');
  if (!track || !viewport || !slides.length) return;

  const total = slides.length;
  let currentIndex = 0;

  function render() {
    // Percent-based offset keeps the position correct after any resize
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    slides.forEach((slide, index) => {
      const isCurrent = index === currentIndex;
      slide.inert = !isCurrent;
      slide.setAttribute('aria-hidden', isCurrent ? 'false' : 'true');
    });

    indicators.forEach((indicator, index) => {
      const isCurrent = index === currentIndex;
      indicator.classList.toggle('is-active', isCurrent);
      if (isCurrent) {
        indicator.setAttribute('aria-current', 'true');
      } else {
        indicator.removeAttribute('aria-current');
      }
    });
  }

  function goTo(index) {
    currentIndex = (index + total) % total;
    render();
  }

  prevBtn?.addEventListener('click', () => goTo(currentIndex - 1));
  nextBtn?.addEventListener('click', () => goTo(currentIndex + 1));

  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => goTo(index));
  });

  // Swipe support for touch screens and mouse drag
  let startX = null;

  viewport.querySelectorAll('img').forEach((img) => {
    img.draggable = false;
  });

  viewport.addEventListener('pointerdown', (event) => {
    startX = event.clientX;
  });

  viewport.addEventListener('pointerup', (event) => {
    if (startX === null) return;
    const deltaX = event.clientX - startX;
    startX = null;

    if (Math.abs(deltaX) < SWIPE_THRESHOLD) return;
    goTo(deltaX < 0 ? currentIndex + 1 : currentIndex - 1);
  });

  viewport.addEventListener('pointercancel', () => {
    startX = null;
  });

  render();
}
