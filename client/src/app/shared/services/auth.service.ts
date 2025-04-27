import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { AppSettingsService } from './app-settings.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private appSettingsService = inject(AppSettingsService);
  private _headers: any;

  getHttpHeaders() {
    this._headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this._headers;
  }
}
