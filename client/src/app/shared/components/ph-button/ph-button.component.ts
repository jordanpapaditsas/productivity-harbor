import { Component, Input, input, OnInit, output, signal, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ph-button',
  templateUrl: './ph-button.component.html',
  styleUrls: ['./ph-button.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [],
})
export class PhButtonComponent implements OnInit {
  text = input<string>('');
  icon = input<string>('');
  type = input<string>('');
  disabled = input<boolean>(false);
  @Input() customCssClass!: string[];

  btnClick = output<Event>();

  constructor() {}

  ngOnInit() {}

  onClick(e: Event) {
    this.btnClick.emit(e);
  }
}
