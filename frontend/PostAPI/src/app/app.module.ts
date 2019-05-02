import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule, MatOptionModule, MatSelectModule, MatIconModule, MatButtonModule, MatCardModule} from '@angular/material';

import {HttpClientModule} from '@angular/common/http';
import { CreatePostComponent } from './dashboard/create-post/create-post.component';
import { ReadPostsComponent } from './dashboard/read-posts/read-posts.component';

import { AuthGuardService as AuthGuard } from './auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    CreatePostComponent,
    ReadPostsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule, MatOptionModule, MatSelectModule, MatIconModule, MatButtonModule, MatCardModule,
    HttpClientModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
