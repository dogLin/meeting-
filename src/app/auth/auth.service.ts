import { JwtService } from './../core/service/jwt.service';
import { Router } from '@angular/router';
import { HttpService } from './../core/service/http.service';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {
  constructor(
    private http: HttpService,
    private jwtService: JwtService,
    private router: Router,
    private jwtHelper: JwtHelperService

  ) {}

  login(userName, pass) {
    return this.http.post('/login', {userName, pass}).subscribe(res => {
        this.jwtService.saveToken(res.data.token)
        this.router.navigate(["/"])
    })
  }

  loginOut() {
    this.jwtService.destroyToken();
    this.router.navigate(['/login'])
  }

  ifLogined() {
     console.log(!this.jwtHelper.isTokenExpired());
    return !this.jwtHelper.isTokenExpired();
  }
}
