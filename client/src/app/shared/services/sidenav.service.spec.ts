/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SidenavService } from './sidenav.service';

describe('Service: Sidenav', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SidenavService]
    });
  });

  it('should ...', inject([SidenavService], (service: SidenavService) => {
    expect(service).toBeTruthy();
  }));
});
