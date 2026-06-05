import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserDto } from '../../../core/dtos/user/user.dto';
import { AppSettingsService } from '../../../shared/services/app-settings.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private appSettingsService = inject(AppSettingsService);
  private authService = inject(AuthService);
  private baseUrl = this.appSettingsService.getAppService();
  private serviceUrl = this.baseUrl + 'Users';
  private headers = this.authService.getHttpHeaders();

  getAll() {
    return this.http.get<UserDto[]>(this.serviceUrl + '/getAll', {
      headers: this.headers,
    });
  }

  getById(userId: Guid) {
    return this.http.get<UserDto>(this.serviceUrl + '/getById/' + userId, {
      headers: this.headers,
    });
  }

  create(user: UserDto) {
    return this.http.post<UserDto>(this.serviceUrl + '/create/', user, {
      headers: this.headers,
    });
  }

  update(user: UserDto) {
    return this.http.put<UserDto>(this.serviceUrl + '/update/', user, {
      headers: this.headers,
    });
  }

  updateStatus(user: UserDto) {
    return this.http.put<UserDto>(this.serviceUrl + '/updateStatus/', user, {
      headers: this.headers,
    });
  }

  deleteById(userId: Guid) {
    return this.http.delete(this.serviceUrl + '/deleteById/' + userId, {
      headers: this.headers,
    });
  }
}
