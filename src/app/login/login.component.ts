import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent {
  user: any = {};

  constructor(private authService: AuthService, private router: Router, private userService: UserService) {
  }

  onSubmit() {
    if (!this.user.email || !this.user.password) {
      console.error('Both email and password are required');
      return;
    }

    this.authService.login(this.user).subscribe(
      (response) => {
        console.log('Login successful', response);
        const fakeToken = response.token;
        this.userService.setToken(fakeToken);
        this.userService.setUserData(response.user);
        this.router.navigate(['/user', response.user.id]);
      },
      (error) => {
        console.error('Login error', error);
      }
    );
  }
}

