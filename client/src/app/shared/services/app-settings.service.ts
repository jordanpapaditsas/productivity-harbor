import { Injectable } from '@angular/core';
import { AppSettingsDto } from '../../core/dto/shared/app-settings.dto';

@Injectable({
  providedIn: 'root',
})
export class AppSettingsService {
  appSettings!: AppSettingsDto;
  private baseUrl: string = 'http://localhost:5000/api/';

  constructor() {
    this.appSettings = new AppSettingsDto();
  }

  getBaseUrl() {
    return this.baseUrl;
  }
}
