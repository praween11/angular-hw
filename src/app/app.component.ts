import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'quiz-app';
  constructor(private authService: AuthService, private route: Router){}
  
  getUsername() {
    if (!this.authService.isAuthenticatedUser()) return '';

    return this.authService.getUser().fullname;
  }
  isLogin() {
    return this.authService.isAuthenticatedUser();
  }
  logout() {
    this.authService.logout();
    this.route.navigate(['/login']);
  }
}
