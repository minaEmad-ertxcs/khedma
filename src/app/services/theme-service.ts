import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {

    toggleDarkMode() {
        document.body.classList.toggle('dark-mode');

        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', JSON.stringify(isDark));
    }

    loadTheme() {
        const isDark = JSON.parse(localStorage.getItem('darkMode') || 'false');
        if (isDark) {
            document.body.classList.add('dark-mode');
        }
    }
}
