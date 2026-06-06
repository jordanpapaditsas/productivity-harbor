import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../../shared/services/auth.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);

  const authRequest = req.clone({
    setHeaders: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth.user()?.Token}`,
    },
  });

  return next(authRequest);
};
