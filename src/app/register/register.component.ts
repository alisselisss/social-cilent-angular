import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})

export class RegisterComponent {
  user: any = {};

  constructor(private userService: UserService, private authService: AuthService) {}

  onSubmit() {
    if (!this.user.username || !this.user.email || !this.user.password) {
      console.error('All fields are required');
      return;
    }

    this.authService.register(this.user).subscribe(
      (response) => {
        console.log('Registration successful', response);
        this.authService.redirectToLogin();
      },
      (error) => {
        console.error('Registration error', error);
      }
    );
  }
}
