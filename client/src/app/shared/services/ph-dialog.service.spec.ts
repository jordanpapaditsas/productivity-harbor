/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PhDialogService } from './ph-dialog.service';

describe('Service: PhDialog', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PhDialogService]
    });
  });

  it('should ...', inject([PhDialogService], (service: PhDialogService) => {
    expect(service).toBeTruthy();
  }));
});
