import { Component, OnInit } from '@angular/core';
import {RequestsService} from '../../requests.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

interface MSG {
  msg: string;
  posts: Array<any>;
  _id?: string;
}

@Component({
  selector: 'app-read-posts',
  templateUrl: './read-posts.component.html',
  styleUrls: ['./read-posts.component.css']
})
export class ReadPostsComponent implements OnInit {

  posts = [];
  commentForm: FormGroup;
  commentUpdateForm: FormGroup;
  editFlag = false;
  updateComment = '';
  update_id = '';
  currentUser = '';

  constructor(private http: RequestsService) { }

  ngOnInit() {
    this.http.readPost()
    .subscribe((res: MSG) => {
      this.posts = res.posts;
      console.log(this.posts);
    });

    this.commentForm = new FormGroup({
      comment: new FormControl(null, [Validators.required])
    });

    this.commentUpdateForm = new FormGroup({
      commentUpdate: new FormControl(null, [Validators.required])
    });

    this.http.authenticate()
    .subscribe((res: MSG) => {
      this.currentUser = res._id;
    });
  }

  onSubmit(id) {
    this.http.addComment({...this.commentForm.value, post_id: id})
    .subscribe((data: MSG) => {
      if (data.msg === 'Comment Saved') {
        this.http.readPost()
        .subscribe((res: MSG) => {
          this.posts = res.posts;
        });
      }
    });
    this.commentForm.reset();
  }

  editWindow(content, id) {
    if (this.editFlag) {
      this.editFlag = false;
      this.updateComment = '';
      this.update_id = '';
    } else {
      this.editFlag = true;
      this.updateComment = content;
      this.update_id = id;
    }
  }

  onSubmitUpdate() {
    const data = {...this.commentUpdateForm.value,  comment_id: this.update_id};
    this.editWindow(data.content, data.post_id);
    console.log(data);
    this.http.updateComment(data)
    .subscribe((res: MSG) => {
      console.log(res.msg);
      if (res.msg === 'Comment Update') {
        this.http.readPost()
        .subscribe((res2: MSG) => {
          this.posts = res2.posts;
        });
      }
    });
  }

  deleteComment(comment_id, author_id, post_id) {
    this.http.deleteComment({comment_id, author_id, post_id})
    .subscribe((res: MSG) => {
      if (res.msg === 'Comment Deleted') {
        this.http.readPost()
        .subscribe((res2: MSG) => {
          this.posts = res2.posts;
        });
      }
    });
  }

}
