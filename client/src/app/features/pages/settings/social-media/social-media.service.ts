import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AppSettingsService } from '../../../../shared/services/app-settings.service';
import { SocialMediaDto } from '../../../../core/dtos/shared/social-media.dto';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root',
})
export class SocialMediaService {
  private http = inject(HttpClient);
  private appSettingsService = inject(AppSettingsService);
  private baseUrl = this.appSettingsService.getAppService();
  private serviceUrl = this.baseUrl + 'SocialMedia';

  constructor() {}

  getAllSocialMedia() {
    return this.http.get<SocialMediaDto[]>(
      this.serviceUrl + '/getAllSocialMedia',
    );
  }

  createSocialMedia(socialMedia: SocialMediaDto) {
    return this.http.post<SocialMediaDto>(
      this.serviceUrl + '/createSocialMedia/',
      socialMedia,
    );
  }

  updateSocialMedia(socialMedia: SocialMediaDto) {
    return this.http.put<SocialMediaDto>(
      this.serviceUrl + '/updateSocialMedia/',
      socialMedia,
    );
  }

  deleteSocialMediaById(socialMediaId: Guid) {
    return this.http.delete(
      this.serviceUrl + '/deleteSocialMediaById/' + socialMediaId,
    );
  }
}
