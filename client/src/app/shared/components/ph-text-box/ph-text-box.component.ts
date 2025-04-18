import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ph-text-box',
  templateUrl: './ph-text-box.component.html',
  styleUrls: ['./ph-text-box.component.scss'],
  imports: [FormsModule, CommonModule],
})
export class PhTextBoxComponent implements OnInit {
  @Input() value: string | null | undefined;
  @Input() placeholder: string = '';
  @Input() readOnly: boolean = false;
  @Input() disabled: boolean = false;
  @Input() customCssClass: string[] = [];

  @Output() valueChange = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  onValueChange(e: any) {
    this.valueChange.emit(e);
  }
}
