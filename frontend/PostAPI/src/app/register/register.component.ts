import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RequestsService} from '../requests.service';
import { Router } from '@angular/router';

interface MSG {
  msg: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  msgFlag = false;
  msgAlert = '';

  registerForm: FormGroup;

  constructor(private http: RequestsService, private router: Router) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      conf_password: new FormControl(null, [Validators.required])
    });
  }

  onSubmit() {
    console.log(this.registerForm);
    console.log(this.registerForm.value);
    this.http.registerPost(this.registerForm.value)
    .subscribe((res: MSG) => {
      console.log(res);
      if (res.msg === 'Registration Succesfully') {
        this.router.navigate(['login']);
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
