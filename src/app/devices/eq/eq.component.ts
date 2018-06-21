import { DomSanitizer } from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxEchartsService } from 'ngx-echarts';
declare var echarts: any;
@Component({
  selector: 'app-eq',
  templateUrl: './eq.component.html',
  styleUrls: ['./eq.component.scss'],
  host: {
    '[class.right_content]': "true",
  }
})
export class EqComponent implements OnInit {
  section = []; //31段均衡点集合
  count = 31;
  type = 'rect'

  outWays = [
    'OUT1', 'OUT2', 'OUT3', 'OUT4', 'OUT5', 'OUT6', 'OUT7', 'OUT8',
  ]
  testValue: any = 123
  min = -60;
  max = 6;
  matrixs = [];

  @ViewChild("eqBoard")
  eqBoard

  constructor(
    private nes: NgxEchartsService,
    private sanitizer: DomSanitizer
  ) {
    // 随机生成31段对应的31个点
    for (let i = 0; i < this.count; i++) {
      this.section.push([(i + 1) * 3 / this.count + 1, 0, i + 1, 0.2])
    }

    for (let i = 0; i < 8; i++) {
      let a = [false, false, false, false, false, false, false, false]
      this.matrixs.push(a)
    }
  }

  ngOnInit() {

  }

  /***
   * 31路与矩阵显示的切换
   */
  typeChange() {
    if (this.type === 'matrix') {
      this.type = 'rect'
    } else {
      this.type = 'matrix'
    }
  }




}
