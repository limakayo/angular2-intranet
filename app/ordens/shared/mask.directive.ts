import { Component, Provider, forwardRef } from '@angular/core';
import { NgModel, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/common';

const MASK_VALUE_ACCESSOR = new Provider(
  NG_VALUE_ACCESSOR, {
    useExisting: forwardRef(() => MaskDirective), multi: true
  }
);

@Component({
  selector: 'my-mask',
  template: '<input class="form-control" [(ngModel)]="value" (keydown)="onInputChange($event)">',
  providers: [ MASK_VALUE_ACCESSOR, NgModel ]
})
export class MaskDirective implements ControlValueAccessor {

  value: any;

  onChange: Function = () => {};
  onTouched: Function = () => {};

  onInputChange(event:any) {
    this.setMask(false, event);
  }

  writeValue(value: any): void {
    if (value != null) {
        this.value = value;
        this.setMask(true, null);
    }
  }

  setMask(initial:boolean, event:any) {
    let formatted = '';

    let value = this.value.replace(/\./g,'').replace(/,/g,'').replace(/^0+/, '');

    if (event && event.keyCode == 8) {
      if (value.length == 1)
        this.value = '0,000';
      if (value.length == 3)
        value = '0' + value;
      if (value.length == 2)
        value = '00' + value;
    } else {
      if (value.length == 0)
        value = '00' + value;
      if (value.length == 1)
        value = '0' + value;
    }

    for (let i = 0; i < value.length; i++) {
      let sep = '';
      if (initial) {
        if (i == 2) sep = ',';
        if (i > 4 && (i+3) % 4 == 0) sep = '.';
      } else if (event && event.keyCode == 8) {
        if (i == 3) sep = ',';
        if (i > 3 && (i+3) % 3 == 0) sep = '.';
      } else {
        if (i == 1) sep = ',';
        if (i > 3 && (i+2) % 3 == 0) sep = '.';
      }

      formatted = value.substring(value.length-1-i, value.length-i) + sep + formatted;
    }

    this.value = formatted;
  }

  registerOnChange(fn: Function): void {
      this.onChange = fn;
  }

  registerOnTouched(fn: Function): void {
      this.onTouched = fn;
  }

}
