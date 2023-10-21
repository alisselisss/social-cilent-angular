import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit {
  users: any[] = [];
  userId: any;

  constructor(private userService: UserService, private authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id');
      if (this.userId === 'all')
        this.loadUsers();
      else
        this.loadFriends();
    });
  }

  logout(): void {
    this.authService.logout();
    this.authService.redirectToLogin();
  }

  private loadUsers(): void {
    this.userService.getUsers().subscribe(
      (users) => {
        this.users = users;
      },
      (error) => {
        console.error('Error loading users', error);
      }
    );
  }

  private loadFriends(): void {
    this.userService.getFriends(this.userId).subscribe(
      (users) => {
        this.users = users;
        console.log(users);
      },
      (error) => {
        console.error('Error loading users', error);
      }
    );
  }
}
