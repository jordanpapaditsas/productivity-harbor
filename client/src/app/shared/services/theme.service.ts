import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  currentTheme = signal<string>('');

  constructor() {
    let theme = this.getCurrentTheme();

    this.setTheme(theme);
  }

  getCurrentTheme() {
    this.currentTheme.set(
      localStorage.getItem('productivity-harbor.theme') || 'light',
    );
    // this.currentTheme.set(
    //   window.matchMedia('(prefers-color-scheme: dark)').matches
    //     ? 'dark'
    //     : 'light'
    // );
    localStorage.setItem('productivity-harbor.theme', `${this.currentTheme()}`);

    return this.currentTheme();
  }

  // getWindowContentLoaded() {
  //   window.addEventListener('DOMContentLoaded', () => {
  //     this.setTheme(this.getCurrentTheme());
  //   });
  // }

  setTheme(theme: any) {
    const root = document.querySelector(':root');

    localStorage.setItem('productivity-harbor.theme', `${theme}`);
    root?.setAttribute(`color-scheme`, `${theme}`);
    console.log(root);
  }
}
