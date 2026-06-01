/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SocialMediaService } from './social-media.service';

describe('Service: SocialMedia', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SocialMediaService]
    });
  });

  it('should ...', inject([SocialMediaService], (service: SocialMediaService) => {
    expect(service).toBeTruthy();
  }));
});
