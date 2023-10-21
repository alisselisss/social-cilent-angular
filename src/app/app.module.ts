import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from "./register/register.component";
import { UserService } from "./services/user.service";
import { LoginComponent } from './login/login.component';
import { UserPageComponent } from './user-page/user-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserListComponent } from './user-list/user-list.component';
import { FriendNewsComponent } from './friend-news/friend-news.component';
import { AdminComponent } from './admin/admin.component'
import { AuthGuard } from './guard/auth.guard';


const routes: Routes = [
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    UserPageComponent,
    UserListComponent,
    FriendNewsComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    NgbModule
  ],
  exports: [RouterModule],
  providers: [UserService, AuthGuard],
  bootstrap: [AppComponent]
})

export class AppModule { }
