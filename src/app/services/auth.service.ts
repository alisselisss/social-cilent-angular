import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router, private userService: UserService) { }

  login(user: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const data = new URLSearchParams();
    data.set('email', user.email);
    data.set('password', user.password);
    return this.http.post(`/api/auth/login`, data.toString(), { headers: headers });
  }

  logout(): void {
    this.userService.removeToken();
    this.userService.removeUserData();
  }

  isAdmin(): boolean {
    const userData = this.userService.getUserData();
    return userData && userData.role === 'admin';
  }

  isAuthenticated(): boolean {
    return !!this.userService.getToken();
  }

  register(user: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const data = new URLSearchParams();
    data.set('username', user.username);
    data.set('email', user.email);
    data.set('password', user.password);

    return this.http.post('/api/register', data.toString(),  { headers: headers });
  }

  redirectToLogin(): void {
    this.router.navigate(['/login']);
  }
}
