import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators/catchError';
import { map } from 'rxjs/operators/map';
import { Observable } from 'rxjs/Observable';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class HttpService {
  api_url: string = environment.api_url
  constructor(
    private http: HttpClient,
    private toastr: ToastrService
  ) {

  }

  handleErrors(error: HttpErrorResponse) {
    let resError;
    console.log("http错误处理-------------------->")
    console.dir(error);
    resError = {
      msg: error.error.msg || "服务端异常",
      status: error.status
    }
    this.toastr.error(resError.msg, "错误")
    console.log("-------------------->http错误处理")

    return new ErrorObservable(resError);
  }

  handleSuccess(data,ifOpen) {
    if (!data.success) {
      this.toastr.error(data.msg, "错误")
      throw data.msg
    }
    if (data.success) {
      if (ifOpen) {
        this.toastr.success(data.msg, "成功")
      }
      return data;
    }
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${this.api_url}${path}`, { params })
      .pipe(catchError(this.handleErrors.bind(this)))
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${environment.api_url}${path}`, body
    ).pipe(catchError(this.handleErrors.bind(this)), map(this.handleSuccess.bind(this)));
  }

  post(path: string, body: Object = {}, ifOpen = true): Observable<any> {
    return this.http.post(
      `${environment.api_url}${path}`, body
    ).pipe(catchError(this.handleErrors.bind(this)), map( (data) => {
      return this.handleSuccess(data, ifOpen)
    }));
  }

  delete(path): Observable<any> {
    return this.http.delete(
      `${environment.api_url}${path}`
    ).pipe(catchError(this.handleErrors.bind(this)), map(this.handleSuccess.bind(this)));
  }
}
