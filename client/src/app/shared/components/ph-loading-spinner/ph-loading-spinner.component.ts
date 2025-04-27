import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ph-loading-spinner',
  template: '<div class="lds-hourglass"></div>',
  styleUrls: ['./ph-loading-spinner.component.css'],
})
export class PhLoadingSpinnerComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
