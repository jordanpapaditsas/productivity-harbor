import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  currentTheme = signal<string>('');

  constructor() {
    this.getWindowContentLoaded();
    this.getCurrentTheme();
  }

  getCurrentTheme() {
    const browserTheme = window.matchMedia('(prefers-color-scheme: dark)')
      .matches
      ? 'dark'
      : 'light';
    const storedTheme = localStorage.getItem('productivity-harbor.theme');

    if (!storedTheme || storedTheme !== browserTheme) {
      this.currentTheme.set(browserTheme);
      localStorage.setItem('productivity-harbor.theme', browserTheme);
    } else {
      this.currentTheme.set(storedTheme);
    }

    return this.currentTheme();
  }

  getWindowContentLoaded() {
    window.addEventListener('DOMContentLoaded', () => {
      this.setTheme(this.getCurrentTheme());
    });
  }

  setTheme(theme: any) {
    const root = document.querySelector(':root');

    localStorage.setItem('productivity-harbor.theme', `${theme}`);
    root?.setAttribute(`color-scheme`, `${theme}`);
    console.log(root);
  }
}
