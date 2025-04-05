/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AppSettingsService } from './app-settings.service';

describe('Service: AppSettings', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppSettingsService]
    });
  });

  it('should ...', inject([AppSettingsService], (service: AppSettingsService) => {
    expect(service).toBeTruthy();
  }));
});
