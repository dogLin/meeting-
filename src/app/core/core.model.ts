import { JWTInterceptor } from './service/JWTInterceptor.service';
import { ApiService } from './../services/api.service';
import { UserService } from './service/user.service';
import { JwtService } from './service/jwt.service';
import { HttpService } from './service/http.service';
import { NgModule, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


export function tokenGetter() {
  return localStorage.getItem('jwtToken')
}

@NgModule({
  imports: [
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: []
      }
    })
  ],
  providers: [
    HttpService,
    JwtService,
    UserService,
    ApiService,
    { provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true },
  ],
  declarations: [],
  exports:[
    HttpClientModule,
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parent: CoreModule) {
    if (parent) {
      throw new Error('模块已经存在，不能重复加载！')
    }
  }
 }
