import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AppSettingsService } from '../app-settings.service';
import { AuthService } from '../auth.service';
import { UserSocialMediaMapDto } from '../../../core/dto/relations/user-social-media-map.dto';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root',
})
export class UserSocialMediaMapService {
  private httpClient = inject(HttpClient);
  private appSettingsService = inject(AppSettingsService);
  private authService = inject(AuthService);
  private baseUrl = this.appSettingsService.getBaseUrl();
  private serviceUrl = this.baseUrl + 'UserSocialMediaMap';
  private headers = this.authService.getHttpHeaders();

  constructor() {}

  getAllUserSocialMediaMapByUserId(userId: Guid) {
    return this.httpClient.get<UserSocialMediaMapDto[]>(
      this.serviceUrl + '/getAllUserSocialMediaMapByUserId/' + userId,
      {
        headers: this.headers,
      }
    );
  }

  createUserSocialMediaMap(socialMedia: UserSocialMediaMapDto) {
    return this.httpClient.post<UserSocialMediaMapDto>(
      this.serviceUrl + '/createUserSocialMediaMap/',
      socialMedia,
      {
        headers: this.headers,
      }
    );
  }

  updateUserSocialMediaMap(socialMedia: UserSocialMediaMapDto) {
    return this.httpClient.put<UserSocialMediaMapDto>(
      this.serviceUrl + '/updateUserSocialMediaMap/',
      socialMedia,
      {
        headers: this.headers,
      }
    );
  }

  deleteUserSocialMediaMapById(id: Guid) {
    return this.httpClient.delete(
      this.serviceUrl + '/deleteUserSocialMediaMapById/' + id,
      {
        headers: this.headers,
      }
    );
  }
}
