import { JwtService } from './../core/service/jwt.service';
import { AuthService } from './auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  //13605151606
  userName: string = ""
  pass: string = ""
  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.userName,this.pass)
  }
}
