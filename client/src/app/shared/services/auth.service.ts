import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AppConfigService } from './app-config.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpHeaders: HttpHeaders = new HttpHeaders();
  private httpClient = inject(HttpClient);
  private appConfigService = inject(AppConfigService);

  getHttpHeaders() {
    return (this.httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    }));
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
