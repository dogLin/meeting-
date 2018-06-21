import { Component, OnInit, Input } from '@angular/core';
import { NgxEchartsService } from 'ngx-echarts';
declare var echarts: any;
@Component({
  selector: 'eq-board',
  templateUrl: './eq-board.component.html',
  styleUrls: ['./eq-board.component.scss'],
})
export class EqBoardComponent implements OnInit {
  @Input()
  section ; //31段均衡点集合
  @Input()
  showLineIndex;
  sectionScatters: any;
  assitLines = []; //31段均衡的31条辅助线
  //配置
  chartOption: any = {
    // title: {
    //   text: 'x5均衡调节器'
    // },
    grid: {
      show: true,
      backgroundColor: 'rgba(28, 28, 28, 1)'
    },
    // x轴
    xAxis: {
      min: 1,
      type: 'value',
      max: Math.log(20000) / Math.log(10),
      axisLabel: {
        margin: 0,
        textStyle: {
          color: 'white'
        },
        formatter: function (value, index) {
          return Math.round(Math.pow(10, value)) + "Hz";
        }
      },
      splitNumber: 7,
      axisLine: {
        onZero: false
      },
      splitLine: {
        lineStyle: {
          // 使用深浅的间隔色
          color: ['#3E434D']
        }
      }
    },
    // y轴
    yAxis: {
      min: -24,
      max: 12,
      type: 'value',
      splitNumber: 7,
      axisLabel: {

        textStyle: {
          color: 'white'
        },
        formatter: '{value} dB',
      },
      axisLine: {
        onZero: true
      },
      splitLine: {
        lineStyle: {
          color: ['#3E434D']
        }
      },
      //data: y_data
    },
    // 鼠标移上去显示
    // tooltip: {
    //   trigger: 'item'
    // }
    tooltip: {
      triggerOn: 'none',
      formatter: function (params) {
        return 'hz: ' + Math.pow(10, params.value[0]).toFixed(2) + '<br>db: ' + params.value[1].toFixed(2)
      }
    },
  }
  // 主线
  mainLine;
  count = 31
  echartsInstance;


  constructor(private nes: NgxEchartsService) {
    // 31段各自曲线
    let lines = this.assitLines;
    if (!this.section || this.section.length == 0) {
      this.section = [];
      for (let i = 0; i < this.count; i++) {
        this.section.push([(i + 1) * 3 / this.count + 1, 0, i + 1, 0.2])
      }
    }

    this.generOption()
  }

  ngOnInit() { }

  // 生成Option
  generOption() {
    // 31段各自曲线
    let lines = this.assitLines = [];
    let allDatas = this.section.map((item, i) => {
      let q = item[3] || 0.2;
      let datas = [];
      for (let i = 1; i <= 5;) {
        datas.push([i, this.generate(i, item[0], item[1], q)])
        i = i + 0.01
      }
      lines.push({
        show: i == this.showLineIndex,
        data: datas,
        type: 'line',
        smooth: false,
        showSymbol: false,
        lineStyle: {
          color: "#aaa",
          width: 1
        },
        areaStyle: {
          color: '#fff',
          opacity: 0.2
        }
      })
      return datas
    })

    let mainLineData = allDatas[0].map((item, i) => {
      let a = item[0];
      let b = allDatas.reduce((a, b) => {
        return a + b[i][1]
      }, 0
      )
      return [a, b]
    })

    this.mainLine = {
      data: mainLineData,
      type: 'line',
      smooth: false,
      showSymbol: false,
      lineStyle: {
        color: "#0CFFB8",
        width: 1
      },
    }
    this.sectionScatters = this.section.map((item, index) => {
      let color = 'RGBA(70, 147, 255, 1)'
      let shadowColor = 'rgba(25, 100, 150, 0.5)';
      if (index == this.showLineIndex) {
        color = 'RGBA(49, 229, 163, 1)'
        shadowColor = 'rgba(49, 229, 163, 1 0.5)';

      }

      return {
        data: [item],
        type: 'effectScatter',
        symbolSize: 10,
        animation: false,
        label: {
          emphasis: {
            show: true,
            formatter: function (param) {
              return 123
            },
            position: 'top'
          },
          normal: {
            show: true,
            formatter: function (param) {
              return param.data[2];
            },
          }
        },
        itemStyle: {
          normal: {
            shadowBlur: 10,
            shadowColor: shadowColor,
            shadowOffsetY: 5,
            color: new this.nes.graphic.RadialGradient(0.4, 0.3, 1, [{
              offset: 0,
              color: color
            }, {
              offset: 1,
              color: color
            }])
          }
        }
      }
    })

    // this.chartOption.series = [];
    this.chartOption.series = [
      ...this.sectionScatters,
      this.mainLine,
      ...(lines.filter(item => item.show)),
    ]
  }

  // 更新视图
  update() {
    this.generOption()
    this.echartsInstance.setOption(this.chartOption, true);
    setTimeout(() => {
      this.echartsInstance.setOption({
        graphic: this.section.map((item, dataIndex) => {
          return {
            type: 'circle',
            position: this.echartsInstance.convertToPixel('grid', item),
            shape: {
              cx: 0,
              cy: 0,
              r: 10
            },
            invisible: true,
            draggable: true,
            ondrag: this.onPointDragging.bind(this, dataIndex),
            onmousedown: this.onMouseDown.bind(this, dataIndex),
            onmousemove: this.onMouseMove.bind(this, dataIndex),
            onmouseout: this.onMouseOut.bind(this, dataIndex),
            z: 100
          };
        })
      })
    }, 0);
  }

  // 图表初始化
  onChartInit(e) {
    this.echartsInstance = e;
    console.log('on chart init:', e);
    setTimeout(() => {
      e.setOption({
        graphic: this.section.map((item, dataIndex) => {
          return {
            type: 'circle',
            position: this.echartsInstance.convertToPixel('grid', item),
            shape: {
              cx: 0,
              cy: 0,
              r: 10
            },
            invisible: true,
            draggable: true,
            ondrag: this.onPointDragging.bind(this, dataIndex),
            onmousedown: this.onMouseDown.bind(this, dataIndex),
            onmousemove: this.onMouseMove.bind(this, dataIndex),
            onmouseout: this.onMouseOut.bind(this, dataIndex),
            z: 100
          };
        })
      })
    }, 0);
  }

  generate(k, x, y, p) {
    // return y * Math.pow(Math.E, -0.5 * Math.pow(k - x, 2) / Math.pow(p, 2))
    return y * Math.pow(Math.E, -0.5 * Math.pow(Math.abs(k - x), 2) / Math.pow(p, 2))
  }





  reset() {
    this.chartOption.series = [];
    this.echartsInstance.setOption(this.chartOption);
  }


  onPointDragging(dataIndex, dx, dy) {
    dx.event.stopPropagation()
    let point = this.echartsInstance.convertFromPixel('grid', dx.target.position);
    let [x, y] = point;
    x = Math.pow(10, x);
    if (x >= 10 && x <= 20000 && y >= -24 && y <= 12) {
      let copy = this.section[dataIndex];
      this.section[dataIndex] = this.echartsInstance.convertFromPixel('grid', dx.target.position);
      this.section[dataIndex][2] = dataIndex + 1;
      this.section[dataIndex][3] = copy[3];

     this.update();
    }
    console.log(this.section[0])
  }

  onMouseMove(dataIndex, e) {
    e.event.stopPropagation()

    this.echartsInstance.dispatchAction({
      type: 'showTip',
      seriesIndex: dataIndex,
      dataIndex: 0
    });
  }

  onMouseOut(dataIndex, e) {
    e.event.stopPropagation()

    this.echartsInstance.dispatchAction({
      type: 'hideTip'
    });
  }
  onMouseDown(dataIndex, e) {
    e.event.stopPropagation()
    this.echartsInstance.dispatchAction({
      type: 'showTip',
      seriesIndex: dataIndex,
      dataIndex: 0
    });
    this.showLineIndex = dataIndex;
    this.update()
  }

  outMouseDown(event: any, type: string) {
    this.showLineIndex = undefined;
    this.update();
    this.echartsInstance.dispatchAction({
      type: 'hideTip'
    });
  }
}
