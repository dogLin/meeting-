import { MeetingService } from './../../services/meeting.service';
import { Component, OnInit } from '@angular/core';
import { format } from "date-fns";
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  title: string = '会议管理系统'
  time: string = ''
  weekDay = ["日","一","二","三","四","五","六"]
  TimeInterval
  options: any = []
  filteredOptions: Observable<string[]>
  myControl: FormControl = new FormControl();
  constructor(
    private meetService: MeetingService
  ) {
    this.time = format(new Date(), 'YYYY/MM/DD') + " 星期" + this.weekDay[new Date().getDay()]
    this.TimeInterval = setInterval(() => {
      this.time = format(new Date(), 'YYYY/MM/DD') + " 星期" + this.weekDay[new Date().getDay()]
    }, 1000)
    this.meetService.getMeeting().subscribe(res => {
      console.log(res)
      if (res.success) {
        console.log(res)
        this.options = res.data
      }
    })
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(val => this.filter(val))
    );
  }

  filter(val: string): string[] {
    return this.options.filter(option =>
      option.name.indexOf(val) >= 0);
  }

}
