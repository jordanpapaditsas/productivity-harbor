import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AppConfigService } from '../../../shared/services/app-config.service';
import { AuthService } from '../../../shared/services/auth.service';
import { SocialMediaDto } from '../../../core/dto/user/social-media.dto';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root',
})
export class SocialMediaService {
  private httpClient = inject(HttpClient);
  private appConfigService = inject(AppConfigService);
  private authService = inject(AuthService);
  private baseUrl = this.appConfigService.getBaseUrl();
  private serviceUrl = this.baseUrl + 'SocialMediaLinks';
  private headers = this.authService.getHttpHeaders();

  constructor() {}

  getAllSocialMedia() {
    return this.httpClient.get<SocialMediaDto[]>(
      this.serviceUrl + '/getAllSocialMedia',
      {
        headers: this.headers,
      }
    );
  }

  getSocialMediaByUserId(userId: Guid) {
    return this.httpClient.get<SocialMediaDto[]>(
      this.serviceUrl + '/getSocialMediaByUserId/' + userId,
      {
        headers: this.headers,
      }
    );
  }

  createSocialMedia(socialMedia: SocialMediaDto) {
    return this.httpClient.post<SocialMediaDto>(
      this.serviceUrl + '/createSocialMedia/',
      socialMedia,
      {
        headers: this.headers,
      }
    );
  }

  updateSocialMedia(socialMedia: SocialMediaDto) {
    return this.httpClient.put<SocialMediaDto>(
      this.serviceUrl + '/updateSocialMedia/',
      socialMedia,
      {
        headers: this.headers,
      }
    );
  }

  deleteSocialMediaById(socialMediaId: Guid) {
    return this.httpClient.delete(
      this.serviceUrl + '/deleteSocialMediaById/' + socialMediaId,
      {
        headers: this.headers,
      }
    );
  }
}
