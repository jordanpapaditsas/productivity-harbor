import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';
import { PhDialogService } from '../../shared/services/ph-dialog.service';
import { DialogTypeEnum } from '../enums/dialog/dialog-type.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private authService = inject(AuthService);
  private dialogService = inject(PhDialogService);
  private router = inject(Router);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Promise<boolean> | Observable<boolean> {
    if (this.authService.isAuthenticated()) {
      debugger;
      return true;
    } else {
      this.dialogService.alertDialog(
        'Login Message',
        'Access denied! Please log in first.',

        DialogTypeEnum.Danger
      );
      this.router.navigate(['/login']);
      return false;
    }
  }
}
