import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AppSettingsService } from '../app-settings.service';
import { AuthService } from '../auth.service';
import { UserSocialMediaMapDto } from '../../../core/dtos/relations/user-social-media-map.dto';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root',
})
export class UserSocialMediaMapService {
  private http = inject(HttpClient);
  private appSettingsService = inject(AppSettingsService);
  private authService = inject(AuthService);
  private baseUrl = this.appSettingsService.getAppService();
  private serviceUrl = this.baseUrl + 'UserSocialMediaMap';
  private headers = this.authService.getHttpHeaders();

  constructor() {}

  getAllUserSocialMediaMapByUserId(userId: Guid) {
    return this.http.get<UserSocialMediaMapDto[]>(
      this.serviceUrl + '/getAllUserSocialMediaMapByUserId/' + userId,
      {
        headers: this.headers,
      },
    );
  }

  createUserSocialMediaMap(socialMedia: UserSocialMediaMapDto) {
    return this.http.post<UserSocialMediaMapDto>(
      this.serviceUrl + '/createUserSocialMediaMap/',
      socialMedia,
      {
        headers: this.headers,
      },
    );
  }

  updateUserSocialMediaMap(socialMedia: UserSocialMediaMapDto) {
    return this.http.put<UserSocialMediaMapDto>(
      this.serviceUrl + '/updateUserSocialMediaMap/',
      socialMedia,
      {
        headers: this.headers,
      },
    );
  }

  deleteUserSocialMediaMapById(id: Guid) {
    return this.http.delete(
      this.serviceUrl + '/deleteUserSocialMediaMapById/' + id,
      {
        headers: this.headers,
      },
    );
  }
}
