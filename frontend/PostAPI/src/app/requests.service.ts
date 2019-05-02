import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(private http: HttpClient) { }

  loginPost(data: any) {
    return this.http.post('http://localhost:3000/login', data, {withCredentials: true});
  }

  registerPost(data: any) {
    return this.http.post('http://localhost:3000/register', data, {withCredentials: true});
  }

  authenticate() {
    return this.http.get('http://localhost:3000/secret', {withCredentials: true});
  }

  createPost(data: any) {
    return this.http.post('http://localhost:3000/createPost', data, {withCredentials: true});
  }

  readPost() {
    return this.http.get('http://localhost:3000/readPosts', {withCredentials: true});
  }

  addComment(data: any) {
    return this.http.post('http://localhost:3000/addComment', data, {withCredentials: true});
  }

  updateComment(data: any) {
    return this.http.post('http://localhost:3000/updateComment', data, {withCredentials: true});
  }

  deleteComment(data: any) {
    return this.http.post('http://localhost:3000/deleteComment', data, {withCredentials: true});
  }
}
