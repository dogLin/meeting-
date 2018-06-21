import { HttpClient } from '@angular/common/http';
import { HttpService } from './http.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators/map';


@Injectable()
export class UserService {
  constructor(
    private jwtHelper: JwtHelperService,
    private http: HttpService,
    private Http: HttpClient
  ) { }

  getCurrentUser() {
    return this.jwtHelper.decodeToken().data
  }

  getAllUser() {
    return this.http.get('/users').pipe(
      map(res => {
        console.log(res)
        return res.data;
      })
    )

  }
}
