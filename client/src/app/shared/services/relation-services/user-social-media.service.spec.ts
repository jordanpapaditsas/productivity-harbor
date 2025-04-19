/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserSocialMediaMapService } from './user-social-media.service';

describe('Service: UserSocialMedia', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserSocialMediaMapService],
    });
  });

  it('should ...', inject(
    [UserSocialMediaMapService],
    (service: UserSocialMediaMapService) => {
      expect(service).toBeTruthy();
    }
  ));
});
