import { Component, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
  imports: [MatSidenavModule],
})
export class SideNavComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
