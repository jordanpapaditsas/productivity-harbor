import { Component, OnInit } from '@angular/core';
import { PhContainerComponent } from '../../../../shared/components/ph-container/ph-container.component';
import { PhToolbarComponent } from '../../../../shared/components/ph-toolbar/ph-toolbar.component';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
  imports: [PhContainerComponent, PhToolbarComponent],
})
export class AdminHomeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
