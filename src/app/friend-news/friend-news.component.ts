import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../services/user.service';
import {AuthService} from "../services/auth.service";
import { HttpClient } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-friend-news',
  templateUrl: './friend-news.component.html',
  styleUrls: ['./friend-news.component.css'],
})
export class FriendNewsComponent implements OnInit {
  userId: any = null;
  friendNews: any[] = [];
  private pollingInterval = 1000;
  private pollingSubscription: Subscription | undefined;

  constructor(private route: ActivatedRoute, private userService: UserService, private authService: AuthService, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.userId = this.userService.getUserData().id;
    this.userService.getFriendsNews(this.userId).subscribe(news => {
      this.friendNews = news;
    });
    this.startPolling();
  }

  ngOnDestroy(): void {
    this.stopPolling();
  }

  logout(): void {
    this.authService.logout();
    this.authService.redirectToLogin();
  }

  private startPolling(): void {
    this.pollingSubscription = interval(this.pollingInterval)
      .pipe(
        switchMap(() => this.http.get<any[]>(`/api/friends/news/${this.userId}`))
      )
      .subscribe((newNews) => {
        this.friendNews = newNews;
      });
  }

  private stopPolling(): void {
    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe();
    }
  }
}
