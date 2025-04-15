import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ph-text-box',
  templateUrl: './ph-text-box.component.html',
  styleUrls: ['./ph-text-box.component.scss'],
  imports: [FormsModule, CommonModule],
})
export class PhTextBoxComponent implements OnInit {
  @Input() value: string | undefined = '';
  @Input() placeholder: string = '';
  @Input() readOnly: boolean = false;
  @Input() disabled: boolean = false;
  @Input() customCssClass: string[] = [];
  constructor() {}

  ngOnInit() {}
}
