import { EventEmitter } from '@angular/core';
import { Component, Input, forwardRef, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
@Component({
  selector: 'app-num-input',
  templateUrl: './num-input.component.html',
  styleUrls: ['./num-input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NumInputComponent),
    multi: true
  }]
})
export class NumInputComponent implements ControlValueAccessor {
  @Input()
  min = 0;
  @Input()
  max = 100;
  @Input() unit: any;
  @Input() counterValue: any;
  private propagateChange: any = {};

  @Output()
  change: EventEmitter<string> = new EventEmitter<string>();
  increment() {
    this.counterValue++;
    this.onChange()

  }
  decrement() {
    this.counterValue--;
    this.onChange()
  }

  onChange() {
    if(!this.counterValue){
      this.counterValue = 0;
    }
    if (this.counterValue < this.min) {
      this.counterValue = this.min;
    }
    if (this.counterValue > this.max) {
      this.counterValue = this.max;
    }
    this.propagateChange(this.counterValue);//值传递
    this.change.emit(this.counterValue)
  }
  /*实现ControlValueAccessor接口部分*/
  writeValue(val: number): void {
    if (val || val === 0) {
      this.counterValue = val;
    }
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {
  }
  setDisabledState?(isDisabled: boolean): void {
  }

}
