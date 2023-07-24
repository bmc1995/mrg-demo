import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable, startWith } from 'rxjs';
/**
 * A service handling the theme of the application.
 *
 * Checks the system preference for dark mode and sets the theme accordingly.
 * If there is no preference, the theme is set to light mode.
 *
 */

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private _isDarkModeSubject: BehaviorSubject<boolean>;
  public isDarkMode$: Observable<boolean>;

  constructor(
    @Inject(DOCUMENT) private _document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    let prefersDarkMode = false;

    if (isPlatformBrowser(this.platformId) && window) {
      prefersDarkMode = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
    }
    this._isDarkModeSubject = new BehaviorSubject<boolean>(prefersDarkMode);
    this.isDarkMode$ = this._isDarkModeSubject.asObservable();

    this.setTheme(!prefersDarkMode);
  }

  toggleTheme() {
    const currentTheme = this._isDarkModeSubject.getValue();
    this.setTheme(!currentTheme);
  }

  setTheme(darkMode: boolean) {
    this._isDarkModeSubject.next(darkMode);

    const root = document.documentElement; // <html>
    if (darkMode) {
      root.classList.remove('dark-mode');
    } else {
      root.classList.add('dark-mode');
    }
  }
}
