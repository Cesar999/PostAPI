import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {RequestsService} from './requests.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Data {
  msg: string;
  auth: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(public router: Router, public http: RequestsService) { }

  canActivate(): Observable<boolean>|boolean {
    return this.http.authenticate()
    .pipe(
      map(
        (data: Data) => {
          if (data.auth) {
            return true;
          } else {
            this.router.navigate(['login']);
            return false;
          }
      })
    );
  }

}
