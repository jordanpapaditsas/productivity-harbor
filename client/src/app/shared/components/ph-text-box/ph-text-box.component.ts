import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ph-text-box',
  templateUrl: './ph-text-box.component.html',
  styleUrls: ['./ph-text-box.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PhTextBoxComponent),
      multi: true,
    },
  ],
  imports: [FormsModule, CommonModule, A11yModule],
})
export class PhTextBoxComponent implements OnInit {
  @ViewChild('input', { static: false }) input!: ElementRef;
  @Input() value: string | null | undefined;
  @Input() placeholder: string = '';
  @Input() readOnly: boolean = false;
  @Input() disabled: boolean = false;
  @Input() customCssClass: string[] = [];
  @Input() type: string = '';
  @Input() autocomplete: string = '';

  @Output() valueChange = new EventEmitter();
  @Output() keyUpEnter = new EventEmitter();

  onChange!: (value?: any) => void;
  onTouch!: (event: any) => void;

  constructor() {}

  ngOnInit() {}

  onValueChange(e: any) {
    this.valueChange.emit(e);
  }
  onKeyupEnter(e: any) {
    this.keyUpEnter.emit(e);
  }

  writeValue(value: any) {
    this.value = value;
  }

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (this.onChange) {
      this.onChange(input.value);
    }
  }

  onTouched(value: any) {
    if (this.onTouch) {
      this.onTouch(value);
    }
  }

  onFocus() {
    this.input.nativeElement.focus();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
}
