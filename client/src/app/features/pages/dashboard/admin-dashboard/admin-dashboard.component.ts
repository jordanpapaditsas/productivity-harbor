import {
  Component,
  OnInit,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { PhToolbarComponent } from '../../../../shared/components/ph-toolbar/ph-toolbar.component';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [PhToolbarComponent],
})
export class AdminDashboardComponent implements OnInit {
  protected readonly titleLabel = signal<string>('Dashboard');
  constructor() {}

  ngOnInit() {}
}
