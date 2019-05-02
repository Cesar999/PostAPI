import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RequestsService} from '../requests.service';
import { Router } from '@angular/router';

interface MSG {
  msg: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  msgFlag = false;
  msgAlert = '';

  loginForm: FormGroup;

  constructor(private http: RequestsService, private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });
  }

  onSubmit() {
    this.http.loginPost(this.loginForm.value).subscribe((res: MSG) => {
      if (res.msg === 'Login Succesfully') {
        this.router.navigate(['dashboard']);
      } else {
          this.messageAlert(res.msg);
      }
    });
  }

  messageAlert(msg) {
    this.msgFlag = true;
    this.msgAlert = msg;
    setTimeout(() => {
      this.msgAlert = '';
      this.msgFlag = false;
    }, 2500);
  }

}
