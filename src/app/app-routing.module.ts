import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { UserPageComponent } from "./user-page/user-page.component";
import { UserListComponent } from './user-list/user-list.component';
import { FriendNewsComponent } from './friend-news/friend-news.component';
import {AdminComponent} from "./admin/admin.component";
import { AuthGuard } from './guard/auth.guard';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user/:id', component: UserPageComponent },
  { path: 'users/:id', component: UserListComponent },
  { path: 'friend-news', component: FriendNewsComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
