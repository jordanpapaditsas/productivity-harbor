import { computed, Injectable, signal } from '@angular/core';
import { ThemeType } from '../../core/types/theme-type';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  theme = signal<ThemeType>('light');
  isDarkTheme = computed(() => this.theme() === 'dark');

  constructor() {
    this.getCurrentTheme();
    this.setTheme(this.theme());
  }

  getCurrentTheme(): ThemeType {
    const savedTheme =
      localStorage.getItem('productivity-harbor.theme') || 'light';

    if (savedTheme) {
      this.theme.set(savedTheme as ThemeType);
      localStorage.setItem('productivity-harbor.theme', `${this.theme()}`);
    }

    return this.theme();
  }

  setTheme(theme: ThemeType) {
    this.theme.set(theme);
    const root = document.querySelector(':root');

    localStorage.setItem('productivity-harbor.theme', `${this.theme()}`);
    root?.setAttribute(`color-scheme`, `${this.theme()}`);

    return this.theme();
  }
}
