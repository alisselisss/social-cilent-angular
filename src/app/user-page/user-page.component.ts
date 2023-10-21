import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from 'src/app/services/auth.service';
import {UserService} from 'src/app/services/user.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
})
export class UserPageComponent implements OnInit {
  userId: any = null;
  userData: any;
  news: any;
  newPhotoUrl: string = '';
  newNewsContent: string = '';
  modalVisible: boolean = false;
  isMyProfile: boolean = false;
  isFriend: boolean = false;

  constructor(private authService: AuthService, private route: ActivatedRoute, private userService: UserService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id');
      this.userService.getUserById(this.userId).subscribe(user => this.userData = user);

      this.checkIfFriend();
      this.checkIfMy();

      this.userService.getUserNews(this.userId).subscribe(news => {
        this.news = news;
      });
    });
  }

  checkIfFriend(): void {
    var target: any;
    this.userService.getUserById(this.userId).subscribe(user => {
      target = user
      if (target.friends.includes(Number(this.userService.getUserData().id)))
        this.isFriend = true;
    });
  }

  checkIfMy(): void {
    if (this.userService.getUserData().id === Number(this.userId))
      this.isMyProfile = true;
  }

  addToFriends(): void {
    this.userService.addToFriends(this.userId, this.userService.getUserData().id).subscribe(
      () => {
        console.log('Added to friends successfully');
        this.isFriend = true;

        var target: any;
        this.userService.getUserById(this.userService.getUserData().id).subscribe(user => {
          target = user;
          this.userService.setUserData(target);
        });
      },
      (error: any) => {
        console.error('Error adding to friends', error);
      }
    );
  }

  removeFromFriends(): void {
    this.userService.removeFromFriends(this.userId, this.userService.getUserData().id).subscribe(
      () => {
        console.log('Removed from friends successfully');

        var target: any;
        this.userService.getUserById(this.userService.getUserData().id).subscribe(user => {
          target = user
          this.userService.setUserData(target);
        });
        this.isFriend = false;
      },
      (error: any) => {
        console.error('Error removing from friends', error);
      }
    );
  }

  logout(): void {
    this.authService.logout();
    this.authService.redirectToLogin();
  }

  openPhotoModal() {
    this.newPhotoUrl = '';
    this.modalVisible = true;
  }

  closePhotoModal() {
    this.modalVisible = false;
  }

  saveChanges(photo: boolean) {
    this.closePhotoModal();
    this.userData.photo = photo ? this.newPhotoUrl : "https://sun1-19.userapi.com/s/v1/ig2/HEYwyGgppTiSOFuM2vg1h6W2aNCCVC6rXoiL3rGwy8q7dM_E9kejkCi1pODwNE-eDrlyt4VEEzmD_sbeaBu9Qcbf.jpg?size=400x400&quality=95&crop=467,154,665,665&ava=1";
    this.userService.updatePhoto(this.userData.id, this.userData.photo).subscribe(
      response => {
        console.log('Фото успешно обновлено:', response);
        this.userService.setUserData(this.userData);
        this.closePhotoModal();
      },
      error => {
        console.error('Ошибка при обновлении фото:', error);
      }
    );
  }

  publishNews() {
    const newNews = {
      userId: this.userId,
      content: this.newNewsContent,
      status: 'active',
      time: new Date().toLocaleString()
    };

    this.userService.addUserNews(this.userId, this.newNewsContent).subscribe(response => {
      if (response.success) {
        this.news.push(newNews);
        this.newNewsContent = '';
      } else {
        console.error('Ошибка при добавлении новости:', response.error);
      }
    });
  }
}
