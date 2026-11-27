import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ph-loading-spinner',
  template: '<div class="lds-hourglass"></div>',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./ph-loading-spinner.component.css'],
})
export class PhLoadingSpinnerComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
