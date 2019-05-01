import { Component } from '@angular/core';
import {RequestsService} from './requests.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PostAPI';
  constructor(private http: RequestsService) { }

  onTest() {
    console.log('Click Test');
    this.http.authenticate().subscribe((test) => {
      console.log(test);
    });
  }
}
