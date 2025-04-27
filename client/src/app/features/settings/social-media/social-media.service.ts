import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AppSettingsService } from '../../../shared/services/app-settings.service';
import { AuthService } from '../../../shared/services/auth.service';
import { SocialMediaDto } from '../../../core/dto/shared/social-media.dto';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root',
})
export class SocialMediaService {
  private http = inject(HttpClient);
  private appSettingsService = inject(AppSettingsService);
  private authService = inject(AuthService);
  private baseUrl = this.appSettingsService.getAppService();
  private serviceUrl = this.baseUrl + 'SocialMedia';
  private headers = this.authService.getHttpHeaders();

  constructor() {}

  getAllSocialMedia() {
    return this.http.get<SocialMediaDto[]>(
      this.serviceUrl + '/getAllSocialMedia',
      {
        headers: this.headers,
      }
    );
  }

  createSocialMedia(socialMedia: SocialMediaDto) {
    return this.http.post<SocialMediaDto>(
      this.serviceUrl + '/createSocialMedia/',
      socialMedia,
      {
        headers: this.headers,
      }
    );
  }

  updateSocialMedia(socialMedia: SocialMediaDto) {
    return this.http.put<SocialMediaDto>(
      this.serviceUrl + '/updateSocialMedia/',
      socialMedia,
      {
        headers: this.headers,
      }
    );
  }

  deleteSocialMediaById(socialMediaId: Guid) {
    return this.http.delete(
      this.serviceUrl + '/deleteSocialMediaById/' + socialMediaId,
      {
        headers: this.headers,
      }
    );
  }
}
