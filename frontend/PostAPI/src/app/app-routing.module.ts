import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreatePostComponent } from './dashboard/create-post/create-post.component';
import { ReadPostsComponent } from './dashboard/read-posts/read-posts.component';
import { AuthGuardService as AuthGuard } from './auth-guard.service';

const routes: Routes = [
  { path: 'register', component: RegisterComponent},
  { path: 'dashboard', component: DashboardComponent,
    children: [{
      path: '',
      children: [
        { path: 'create-post', component: CreatePostComponent},
        { path: 'read-posts', component: ReadPostsComponent}
      ]
    }
  ], canActivate: [AuthGuard]},
  { path: '**', component: LoginComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
