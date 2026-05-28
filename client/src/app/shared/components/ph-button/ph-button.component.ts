
import { Component, Input, input, OnInit, output, signal } from '@angular/core';

@Component({
  selector: 'ph-button',
  templateUrl: './ph-button.component.html',
  styleUrls: ['./ph-button.component.css'],
  imports: [],
})
export class PhButtonComponent implements OnInit {
  text = input<string>('');
  icon = input<string>('');
  type = input<string>('');
  disabled = input<boolean>(false);
  @Input() customCssClass!: string[];

  click = output<Event>();

  constructor() {}

  ngOnInit() {}

  onClick(e: Event) {
    this.click.emit(e);
  }
}
