import { inject, Injectable } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private authService = inject(AuthService);

  registerUser(data: FormData) {
    return this.authService.register(data);
  }
}
