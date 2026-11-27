import { inject, Injectable, signal } from '@angular/core';
import { AppSettingsDto } from '../../core/dtos/shared/app-settings.dto';
import { firstValueFrom, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PhDialogService } from './ph-dialog.service';
import { DialogTypeEnum } from '../../core/enums/dialog/dialog-type.enum';

@Injectable({
  providedIn: 'root',
})
export class AppSettingsService {
  private _appSettings = signal<AppSettingsDto>({ appServiceUrl: '' });
  private http = inject(HttpClient);
  private dialogService = inject(PhDialogService);

  async loadSettings(): Promise<void> {
    const obs = this.getAppSettings();

    const result = (await firstValueFrom(obs)) as AppSettingsDto;

    if (result) {
      this._appSettings.set(result);
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
    return this._appSettings().appServiceUrl;
  }
  getAppVersion() {
    return this._appSettings().appVersion;
  }
  getAppLogo() {
    return this._appSettings().appLogo;
  }
  getAppName() {
    return this._appSettings().appName;
  }
}
