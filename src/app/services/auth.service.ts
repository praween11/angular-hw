import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { AuthData, UserData } from '@app/models/user-data';
import { Router } from '@angular/router';
const AUTH_API = "https://training-homework.calllab.net";
const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = false;
  private authSecretKey = 'Token';
  private userKey = 'User'

  constructor(private client: HttpClient, private router: Router) { 
    this.isAuthenticated = !!localStorage.getItem(this.authSecretKey);
  }
  
  login(username: string, password: string): Observable<any> {
    return this.client.post<HttpResponse<any>>(AUTH_API + '/v1/login', {
      username: username, 
      password: password
    }, httpOptions)
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated && this.getUser() != null;
  }

  getAuthorizationToken(): any {
    if (this.isAuthenticated){
      const user = localStorage.getItem(this.authSecretKey);
      var userData = user ? JSON.parse(user) : null;
      return userData.token;
    }
    else {
      this.logout();
    }
  }

  getUser(): UserData {
    const user = localStorage.getItem(this.authSecretKey);
    return user ? JSON.parse(user) : null;
  }

  saveUser(user: any): void {
    localStorage.removeItem(this.authSecretKey);
    let data = new UserData();
    data.fullname = user?.data.fullName;
    data.token = user?.data.accessToken;
    this.isAuthenticated = true;
    localStorage.setItem(this.authSecretKey, JSON.stringify(data));
  }

  logout(): void {
    console.log('logout');
    localStorage.removeItem(this.authSecretKey);
    localStorage.removeItem(this.userKey);
    this.isAuthenticated = false;
    this.router.navigate(['login']);
  }
}
