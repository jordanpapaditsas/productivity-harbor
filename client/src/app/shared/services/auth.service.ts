import { HttpClient, HttpHeaders } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { AppSettingsService } from './app-settings.service';
import { map, Observable } from 'rxjs';
import { LoginDto } from '../../core/dto/auth/login.dto';
import { UserDto } from '../../core/dto/user/user.dto';
import { ApiResponseDto } from '../../core/dto/shared/api-response.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user = signal<UserDto | undefined>(undefined);
  private http = inject(HttpClient);
  private appSettingsService = inject(AppSettingsService);
  private baseUrl = this.appSettingsService.getAppService();
  private serviceUrl = this.baseUrl + 'Account';
  private _headers: any;
  private headers = this.getHttpHeaders();
  private _isUserLoggedIn = signal<boolean>(false);
  readonly isAuthenticated = computed(() => this._isUserLoggedIn());

  constructor() {
    // localStorage.getItem('token');
  }

  getHttpHeaders() {
    this._headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.user()?.Token}`,
    });

    return this._headers;
  }

  login(login: LoginDto): Observable<ApiResponseDto> {
    return this.http
      .post<any>(this.serviceUrl + '/login', login, {
        headers: this.headers,
      })
      .pipe(
        map((response) => {
          if (response.IsSuccess) {
            let apiResponse = response;
            this.user.set(apiResponse.Data);
            localStorage.setItem('token', this.user()?.Token!);
            this._isUserLoggedIn.set(true);
          }

          return response;
        })
      );
  }

  logout(): void {
    if (this.user()?.Token) {
      this.user()!.Token = '';
      localStorage.removeItem('token');
      this._isUserLoggedIn.set(false);
      window.location.reload();
    }
  }
}
