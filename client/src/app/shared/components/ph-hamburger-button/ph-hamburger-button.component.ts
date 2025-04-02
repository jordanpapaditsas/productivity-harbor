import { Component, input, OnInit, output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'ph-hamburger-button',
  templateUrl: './ph-hamburger-button.component.html',
  styleUrls: ['./ph-hamburger-button.component.scss'],
})
export class PhHamburgerButtonComponent implements OnInit {
  initialState = input<boolean>(false);
  isClosed = input<Observable<void>>(new Observable<void>());
  trigger = output<void>();
  isActive: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.isActive = this.initialState() || false;

    if (this.isClosed) {
      this.isClosed().subscribe(() => (this.isActive = false));
    }
  }

  triggered(): void {
    this.isActive = !this.isActive;
    this.trigger.emit();
  }
}
