import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RequestsService} from '../../requests.service';

interface MSG {
  msg: string;
}

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  msgFlag = false;
  msgAlert = '';

  createPostForm: FormGroup;

  constructor(private http: RequestsService) { }

  ngOnInit() {
    this.createPostForm = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      body: new FormControl(null, [Validators.required])
    });
  }

  onSubmit() {
    console.log(this.createPostForm);
    console.log(this.createPostForm.value);

    this.http.createPost(this.createPostForm.value)
    .subscribe((data: MSG) => {
      console.log(data);
    });
  }
}
