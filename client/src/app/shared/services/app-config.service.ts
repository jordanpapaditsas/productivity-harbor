import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  private baseUrl: string = 'http://localhost:5000/api/';

  getBaseUrl() {
    return this.baseUrl;
  }
}
