import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  private sidenav!: MatSidenav;

  public setSidenav(sidenav: MatSidenav) {
    return (this.sidenav = sidenav);
  }

  public isSidenavOpen() {
    return this.sidenav.opened;
  }

  public isSidenavClosed() {
    return !this.sidenav.opened;
  }

  public toggleSidenav(): void {
    this.sidenav.toggle();
  }
}
