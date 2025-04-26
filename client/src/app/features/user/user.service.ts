import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserDto } from '../../core/dto/user/user.dto';
import { AppSettingsService } from '../../shared/services/app-settings.service';
import { AuthService } from '../../shared/services/auth.service';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private httpClient = inject(HttpClient);
  private appSettingsService = inject(AppSettingsService);
  private authService = inject(AuthService);
  private baseUrl = this.appSettingsService.getBaseUrl();
  private serviceUrl = this.baseUrl + 'Users';
  private headers = this.authService.getHttpHeaders();

  getAllUsersData() {
    return this.httpClient.get<UserDto[]>(this.serviceUrl + '/getAllUsers', {
      headers: this.headers,
    });
  }

  getUserById(userId: Guid) {
    return this.httpClient.get<UserDto>(
      this.serviceUrl + '/getUserById/' + userId,
      {
        headers: this.headers,
      }
    );
  }

  createUser(user: UserDto) {
    return this.httpClient.post<UserDto>(
      this.serviceUrl + '/createUser/',
      user,
      {
        headers: this.headers,
      }
    );
  }

  updateUser(user: UserDto) {
    return this.httpClient.put<UserDto>(
      this.serviceUrl + '/updateUser/',
      user,
      {
        headers: this.headers,
      }
    );
  }

  updateUserStatus(user: UserDto) {
    return this.httpClient.put<UserDto>(
      this.serviceUrl + '/updateUserStatus/',
      user,
      {
        headers: this.headers,
      }
    );
  }

  deleteUserById(userId: Guid) {
    return this.httpClient.delete(
      this.serviceUrl + '/deleteUserById/' + userId,
      {
        headers: this.headers,
      }
    );
  }
}
