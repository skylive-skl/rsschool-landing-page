/**
 * Theme switching module with localStorage persistence.
 */

const THEME_STORAGE_KEY = 'theme';

export function initTheme() {
  const toggles = document.querySelectorAll('.theme-toggle');
  if (!toggles.length) return;

  function syncToggleUI(theme) {
    const isDark = theme === 'dark';
    toggles.forEach((btn) => {
      btn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
      btn.setAttribute(
        'aria-label',
        isDark ? 'Switch to light theme' : 'Switch to dark theme'
      );
    });
  }

  // Get current active theme
  const currentTheme =
    document.documentElement.dataset.theme ||
    localStorage.getItem(THEME_STORAGE_KEY) ||
    'light';

  // Apply to document and sync UI
  document.documentElement.dataset.theme = currentTheme;
  syncToggleUI(currentTheme);

  // Bind click listener to all theme toggles
  toggles.forEach((btn) => {
    btn.addEventListener('click', () => {
      const activeTheme = document.documentElement.dataset.theme;
      const nextTheme = activeTheme === 'dark' ? 'light' : 'dark';

      document.documentElement.dataset.theme = nextTheme;
      try {
        localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
      } catch (e) {
        // Handle private browsing quota exceptions gracefully
      }
      syncToggleUI(nextTheme);
    });
  });
}
