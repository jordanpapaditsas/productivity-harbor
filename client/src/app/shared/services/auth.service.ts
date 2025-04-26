import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AppSettingsService } from './app-settings.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpClient = inject(HttpClient);
  private appSettingsService = inject(AppSettingsService);
  private _headers: any;

  getHttpHeaders() {
    this._headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this._headers;
  }

  // baseUrl: string = 'http://localhost:5000/api';
  // controller: string = 'Accounts';
  // private httpClient = inject(HttpClient);
  // register(data: FormData): Observable<ApiResponseDto> {
  //   return this.httpClient.post<ApiResponseDto>(
  //     `${this.baseUrl}/${this.controller}/register`,
  //     data
  //   );
  // }
}
