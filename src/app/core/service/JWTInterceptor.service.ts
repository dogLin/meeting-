import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * http请求拦截器
 */
@Injectable()
export class JWTInterceptor implements HttpInterceptor  {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const JWT = `Bearer ${localStorage.getItem('jwtToken')}`;
    req = req.clone({
      setHeaders: {
        Authorization: JWT
      }
    });
    return next.handle(req);
  }
}
