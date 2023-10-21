import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  template: '<iframe src="http://localhost:3000/news" width="100%" height="100%"></iframe>',
  styles: [`
    iframe {
      width: 100vw;
      height: 100vh;
      border: none;
    }
  `],
})
export class AdminComponent {}

