import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';
import { UserDto } from '../../core/dto/user/user.dto';
import { AppConfigService } from '../../shared/services/app-config.service';
import { AuthService } from '../../shared/services/auth.service';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnInit {
  private httpClient = inject(HttpClient);
  private appConfigService = inject(AppConfigService);
  private authService = inject(AuthService);

  baseUrl = this.appConfigService.getBaseUrl();
  serviceUrl = this.baseUrl + 'Users';
  headers = this.authService.getHttpHeaders();

  ngOnInit(): void {
    this.getAllUsersDataSource();
  }

  getAllUsersDataSource() {
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

  insertUser(user: UserDto) {
    return this.httpClient.post<UserDto>(
      this.serviceUrl + '/insertUser/',
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

  deleteById(userId: Guid) {
    return this.httpClient.delete(this.serviceUrl + '/deleteById/' + userId, {
      headers: this.headers,
    });
  }
}
