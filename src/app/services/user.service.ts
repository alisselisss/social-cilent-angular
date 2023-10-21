import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private tokenKey: any = null;
  private userKey: any = null;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>('/api/users');
  }

  getFriends(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`/api/friends/${userId}`);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.tokenKey);
  }

  setToken(token: string): void {
    sessionStorage.setItem(this.tokenKey, token);
  }

  removeToken(): void {
    sessionStorage.removeItem(this.tokenKey);
  }

  getUserData(): any {
    const userDataString = sessionStorage.getItem(this.userKey);
    return userDataString ? JSON.parse(userDataString) : null;
  }

  setUserData(userData: any): void {
    sessionStorage.setItem(this.userKey, JSON.stringify(userData));
  }

  removeUserData(): void {
    sessionStorage.removeItem(this.userKey);
  }

  updatePhoto(userId: string, newPhotoUrl: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const data = new URLSearchParams();
    data.set('userId', userId);
    data.set('newPhotoUrl', newPhotoUrl);

    return this.http.post('/api/users/update-photo', data.toString(), { headers: headers });
  }

  getUserById(userId: string): Observable<any> {
    return this.http.get<any>(`/api/users/${userId}`);
  }

  getUserNews(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`/api/news/${userId}`);
  }

  getFriendsNews(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`/api/friends/news/${userId}`);
  }

  addUserNews(userId: string, newNews: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const data = new URLSearchParams();
    data.set('content', newNews);

    return this.http.post(`api/add/news/${userId}`, data.toString(), { headers: headers });
  }

  addToFriends(friendId: string, userId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const data = new URLSearchParams();
    data.set('userId', userId);
    data.set('friendId', friendId);
    return this.http.post(`/api/add-friend/`, data.toString(), { headers: headers });
  }

  removeFromFriends(friendId: string, userId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const data = new URLSearchParams();
    data.set('userId', userId);
    data.set('friendId', friendId);
    return this.http.post(`/api/remove-friend/`, data.toString(), { headers: headers });
  }
}
