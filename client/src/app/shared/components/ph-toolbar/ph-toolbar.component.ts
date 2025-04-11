import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'ph-toolbar',
  templateUrl: './ph-toolbar.component.html',
  styleUrls: ['./ph-toolbar.component.css'],
  imports: [MatToolbarModule],
})
export class PhToolbarComponent implements OnInit {
  items!: any[];
  constructor() {}

  ngOnInit() {
    this.items = [
      {
        text: 'hi',
        icon: 'ast',
      },
    ];
  }
}
