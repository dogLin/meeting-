import { NavService } from './manage/nav/nav.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { filter } from 'rxjs/operators'
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  constructor (
    private router: Router,
    private nav: NavService,
    private activatedRoute: ActivatedRoute
  ) {
    this.router.events
    .filter( event => event instanceof NavigationEnd)
    .map((event: any) => {
      console.log('NavigationEnd:', event);
      let checkList = event.url.split('?')[0].split('/')
      this.nav.selectListSub.next(checkList);
      return this.activatedRoute
    })
    .map(route => {
      while (route.firstChild) route = route.firstChild;
      return route;
    })
    .filter(route => route.outlet === 'primary')
    .mergeMap(route => route.data)
    .subscribe((route: any) => {
        this.nav.titleSub.next(route.title)
    });
  }



}
