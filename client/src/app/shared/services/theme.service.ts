import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  currentTheme = signal<string>('');

  constructor() {
    this.getCurrentTheme();
  }

  getCurrentTheme() {
    this.currentTheme.set(
      window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
    );

    localStorage.getItem('productivity-harbor.theme') || this.currentTheme();
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
