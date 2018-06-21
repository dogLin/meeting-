import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class NavService {

  selectListSub = new BehaviorSubject (['home'])
  titleSub = new BehaviorSubject ("首页")
  constructor() {}
}
