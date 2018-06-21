import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { window } from 'rxjs/operators/window';

@Component({
  selector: 'app-rotary-switch',
  templateUrl: './rotary-switch.component.html',
  styleUrls: ['./rotary-switch.component.scss']
})
export class RotarySwitchComponent implements OnInit {
  @Input()
  min:number = 0
  @Input()
  max:number = 100
  @Input()
  currentValue = this.min

  center = { x: 62, y: 62 };
  angle = 0;
  currentAngle;
  isDown;
  scales = [];
  constructor(
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.currentValue = this.min
    for (let i = 0; i < 21; i++) {
      this.scales.push("x")
    }
    document.addEventListener("mouseup",this.mouseUp.bind(this))
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    document.removeEventListener("mouseup",this.mouseUp.bind(this))
  }

  calcAngle(x, y): number {
    x = x - this.center.x;
    y = -(y - this.center.y);
    console.log(x, y)
    let angle;
    if (x != 0) {
      let tan = Math.abs(y / x);
      if (x > 0 && y >= 0) {
        angle = Math.atan(tan);
      }
      if (x > 0 && y < 0) {
        angle = 2 * Math.PI - Math.atan(tan)
      }
      if (x < 0 && y >= 0) {
        angle = Math.PI - Math.atan(tan);
      }
      if (x < 0 && y < 0) {
        angle = Math.PI + Math.atan(tan)
      }
    } else {
      if (y > 0) {
        angle = Math.PI / 2;
      } else {
        angle = -Math.PI / 2
      }
    }
    return Number(((angle * 180) / Math.PI))
  }

  mouseDown(e) {
    this.isDown = true;
    this.currentAngle = this.calcAngle(e.layerX, e.layerY)
    console.log(this.currentAngle);

  }

  move(e) {
    // console.log(e.movementX,e.movementY);
    if (this.isDown) {
      let angle = this.calcAngle(e.layerX, e.layerY);
      let angleIncreased = angle - this.currentAngle;
      if (angleIncreased < -270) {
        angleIncreased = angleIncreased + 360;
      } else if (angleIncreased > 270) {
        angleIncreased = angleIncreased - 360;
      }

      this.currentAngle = angle;
      this.angle -= angleIncreased;
      if (this.angle < 0) {
        console.log('angleIncreased', angleIncreased)
        this.angle = 0;
      }
      if (this.angle > 270) {
        console.log('angleIncreased', angleIncreased)
        this.angle = 270;
      }
      console.log("angle", this.angle)
      this.currentValue = Number((this.angle/270 * (this.max-this.min) + this.min).toFixed(2));
    }
  }

  mouseUp(e) {
    this.isDown = false;
  }

  getAngleStyle(a) {
    return this.sanitizer.bypassSecurityTrustStyle(`rotate(${a}deg)`)
  }

  inputChange(e) {
    this.angle = e/(this.max-this.min) * 270
  }
}
