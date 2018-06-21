import { Observable } from 'rxjs/Observable';
import { NavService } from './nav.service';
import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  @Input()
  menuList: Array<any> = environment.menuList

  @Input()
  selectList

  @Output()
  onMenuChange = new EventEmitter<any>()



  $selectList
  constructor(
    private navService: NavService
  ) {
    this.$selectList = navService.selectListSub.asObservable();
    this.$selectList.subscribe(data => {
      this.selectList = data;
    })
  }

  ngOnInit() {
  }

  toogleOpen(menu) {
    if (menu.menus && menu.menus.length > 0) {
      menu._open = !menu._open;
    } else {
      this.navService.selectListSub.next([menu.id])
      this.onMenuChange.emit({
        menu,
        id: menu.id
      })
    }
  }

  childChange(e) {
        this.onMenuChange.emit({
          id: e.id
        })
  }

  ifSelected(menu) {
    if (this.selectList.indexOf(menu.id) >= 0) {
      return true;
    }
    if (menu.menus && menu.menus.length > 0) {
      let b = menu.menus.find(a => {
        return this.ifSelected(a)
      })
      if (b) {
        return true
      }
    }
  }
}
