import { HttpClient, HttpContext, HttpHeaders } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { AppSettingsService } from './app-settings.service';
import { map, Observable } from 'rxjs';
import { LoginDto } from '../../core/dtos/auth/login.dto';
import { UserDto } from '../../core/dtos/user/user.dto';
import { ApiResponseDto } from '../../core/dtos/shared/api-response.dto';
import { ChangePasswordDto } from '../../core/dtos/auth/change-password.dto';
import { SHOW_TOASTR } from '../../core/interceptors/server-error.interceptor';
import { RegisterDto } from '../../core/dtos/auth/register.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user = signal<UserDto | undefined>(undefined);
  private http = inject(HttpClient);
  private appSettingsService = inject(AppSettingsService);

  private serviceUrl = computed(() => {
    return (this.appSettingsService.getAppService() || '') + 'Auth';
  });

  private _isUserLoggedIn = signal<boolean>(false);
  readonly isAuthenticated = computed(() => this._isUserLoggedIn());

  constructor() {}

  login(login: LoginDto): Observable<ApiResponseDto> {
    return this.http
      .post<ApiResponseDto>(this.serviceUrl() + '/login', login, {
        context: new HttpContext().set(SHOW_TOASTR, false),
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
        }),
      );
  }

  loginAsAGuest() {
    return this.http.post(this.serviceUrl() + '/loginAsAGuest', {
      context: new HttpContext().set(SHOW_TOASTR, false),
    });
  }

  createNewUser(
    userRegistrationCredentials: RegisterDto,
  ): Observable<ApiResponseDto> {
    return this.http
      .post<ApiResponseDto>(
        this.serviceUrl() + '/register',
        userRegistrationCredentials,
        {
          context: new HttpContext().set(SHOW_TOASTR, false),
        },
      )
      .pipe(
        map((response) => {
          return response;
        }),
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

  changePassword(changePasswordDto: ChangePasswordDto) {
    return this.http.post<ChangePasswordDto>(
      this.serviceUrl() + '/changePassword',
      changePasswordDto,
    );
  }
}
