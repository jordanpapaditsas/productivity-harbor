import { inject, Injectable } from '@angular/core';
import { AppSettingsDto } from '../../core/dtos/shared/app-settings.dto';
import { firstValueFrom, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PhDialogService } from './ph-dialog.service';
import { DialogTypeEnum } from '../../core/enums/dialog/dialog-type.enum';

@Injectable({
  providedIn: 'root',
})
export class AppSettingsService {
  private _appSettings!: AppSettingsDto;
  private http = inject(HttpClient);
  private dialogService = inject(PhDialogService);

  constructor() {}

  async loadSettings() {
    const obs = this.getAppSettings();

    const result = await firstValueFrom(obs);

    if (result) {
      this._appSettings = result as AppSettingsDto;
    } else {
      this.dialogService.alertDialog(
        'There was an error loading the application settings.',
        'Error Message',
        DialogTypeEnum.Danger,
      );
    }
  }

  private getAppSettings(): Observable<any> {
    return this.http.get('/assets/json/appsettings.json');
  }
  getAppService() {
    return this._appSettings.AppServiceUrl;
  }
  getAppVersion() {
    return this._appSettings.AppVersion;
  }
  getAppLogo() {
    return this._appSettings.AppLogo;
  }
  getAppName() {
    return this._appSettings.AppName;
  }
}
