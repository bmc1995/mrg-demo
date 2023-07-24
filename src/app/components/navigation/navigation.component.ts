import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { ThemeService } from '@services/theme.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  constructor(private auth: AuthService, private themeService: ThemeService) {}
  isDarkMode$ = this.themeService.isDarkMode$;
  isAuthenticating$ = this.auth.isLoading$;
  isAuthenticated$ = this.auth.isAuthenticated$;

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  login(): void {
    this.auth.loginWithRedirect();
  }

  logout(): void {
    this.auth.logout({ logoutParams: { returnTo: window.location.origin } });
  }
}
