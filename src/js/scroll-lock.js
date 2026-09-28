/**
 * Page scroll lock shared by the burger menu and the modal.
 * A counter keeps the page locked while at least one consumer needs it.
 */

let lockCount = 0;

export function lockScroll() {
  lockCount += 1;
  if (lockCount > 1) return;

  // Compensate for the disappearing scrollbar so the layout does not jump
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  document.body.style.paddingRight = scrollbarWidth > 0 ? `${scrollbarWidth}px` : '';
  document.body.classList.add('is-locked');
}

export function unlockScroll() {
  if (lockCount === 0) return;
  lockCount -= 1;
  if (lockCount > 0) return;

  document.body.classList.remove('is-locked');
  document.body.style.paddingRight = '';
}
