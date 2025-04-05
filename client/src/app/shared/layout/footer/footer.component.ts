import { Component, inject, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppStaticData } from '../../../core/utils/app-static-data';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  imports: [MatToolbarModule],
})
export class FooterComponent implements OnInit {
  developer: string = '';
  year: any;
  copyrightText: string = '';

  ngOnInit() {
    this.developer = AppStaticData.developer;
    this.year = new Date().getFullYear();
    this.copyrightText = 'All rights reserved.';
  }
}
