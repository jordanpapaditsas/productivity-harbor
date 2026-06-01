import { Component, OnInit, signal } from '@angular/core';
import { PhContainerComponent } from '../../../../shared/components/ph-container/ph-container.component';
import { PhToolbarComponent } from '../../../../shared/components/ph-toolbar/ph-toolbar.component';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  imports: [PhContainerComponent, PhToolbarComponent],
})
export class AdminDashboardComponent implements OnInit {
  protected readonly titleLabel = signal<string>('Dashboard');
  constructor() {}

  ngOnInit() {}
}
