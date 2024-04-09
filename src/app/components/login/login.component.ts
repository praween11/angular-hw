import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserData } from '@app/models/user-data';
import { AuthService } from '@app/services/auth.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm: any = {
    username: null,
    password: null
  };
  isLoginFailed = false;
  errorMessage = '';
  constructor(private fb: FormBuilder, private authService: AuthService, private route: Router) {}

  ngOnInit(): void {
    if(this.authService.isAuthenticatedUser()){
      this.route.navigate(['/quiz-category']);
    }
  }
  onSubmit(){
    const {username, password} = this.loginForm
    this.authService.login(
      username, password
    ).subscribe({
      next: data => {
        console.log('login success');
        this.authService.saveUser(data);
        this.isLoginFailed = false;
        this.route.navigate(['/quiz-category']);
      },
      error: err => {
        console.log('login fail');
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    })
  }
}
