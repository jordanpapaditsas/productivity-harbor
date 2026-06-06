import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AppSettingsService } from '../app-settings.service';
import { UserSocialMediaMapDto } from '../../../core/dtos/relations/user-social-media-map.dto';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root',
})
export class UserSocialMediaMapService {
  private http = inject(HttpClient);
  private appSettingsService = inject(AppSettingsService);
  private baseUrl = this.appSettingsService.getAppService();
  private serviceUrl = this.baseUrl + 'UserSocialMediaMap';

  constructor() {}

  getAllUserSocialMediaMapByUserId(userId: Guid) {
    return this.http.get<UserSocialMediaMapDto[]>(
      this.serviceUrl + '/getAllUserSocialMediaMapByUserId/' + userId,
    );
  }

  createUserSocialMediaMap(socialMedia: UserSocialMediaMapDto) {
    return this.http.post<UserSocialMediaMapDto>(
      this.serviceUrl + '/createUserSocialMediaMap/',
      socialMedia,
    );
  }

  updateUserSocialMediaMap(socialMedia: UserSocialMediaMapDto) {
    return this.http.put<UserSocialMediaMapDto>(
      this.serviceUrl + '/updateUserSocialMediaMap/',
      socialMedia,
    );
  }

  deleteUserSocialMediaMapById(id: Guid) {
    return this.http.delete(
      this.serviceUrl + '/deleteUserSocialMediaMapById/' + id,
    );
  }
}
