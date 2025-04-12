import { Component, OnInit } from '@angular/core';
import { PhToolbarComponent } from '../../../shared/components/ph-toolbar/ph-toolbar.component';
import { PhContainerComponent } from '../../../shared/components/ph-container/ph-container.component';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
  imports: [PhToolbarComponent, PhContainerComponent],
})
export class AdminHomeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  onExitClicked(e: any) {}
}
