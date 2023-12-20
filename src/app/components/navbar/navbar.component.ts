import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  isLoginPage: boolean = false;
  logged: boolean | null = null;

  loading: boolean = true;

  logout() {
    this.loginService.logout();
    window.location.href = '/';
  }

  constructor(private loginService: LoginService) {
    if (window.location.pathname === '/login' || window.location.pathname === '/register') {
      this.isLoginPage = true;
    }
    
    this.logged = this.loginService.isLogged();

    this.loading = false;
  }
}