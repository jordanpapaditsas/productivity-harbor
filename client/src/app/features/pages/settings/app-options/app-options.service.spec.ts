/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AppOptionsService } from './app-options.service';

describe('Service: AppOptions', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppOptionsService]
    });
  });

  it('should ...', inject([AppOptionsService], (service: AppOptionsService) => {
    expect(service).toBeTruthy();
  }));
});
