// T-02C: Theme engine — contract: localStorage key 'theme' = 'light' | 'dark'
const STORAGE_KEY = 'theme';
const root = document.documentElement;

function readSavedTheme() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === 'light' || saved === 'dark' ? saved : null;
  } catch {
    return null;
  }
}

function saveTheme(theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Storage blocked (private mode / browser policy): theme still works for this visit.
  }
}

function getInitialTheme() {
  return readSavedTheme()
    ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
}

function applyTheme(theme) {
  root.dataset.theme = theme;
  const toggle = document.querySelector('#theme-toggle');
  if (toggle) {
    toggle.setAttribute('aria-pressed', String(theme === 'dark'));
  }
}

// Runs in <head> before first paint → no flash of the wrong theme.
applyTheme(getInitialTheme());

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('#theme-toggle');
  if (!toggle) return;

  applyTheme(root.dataset.theme);

  toggle.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    saveTheme(next);
  });
});