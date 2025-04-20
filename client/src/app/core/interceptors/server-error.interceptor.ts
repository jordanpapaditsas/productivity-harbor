import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpErrorResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from '../../shared/services/notification.service';
export const serverErrorInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  const notifier = inject(NotificationService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('HTTP Error Intercepted:', error);

      let message = 'An unexpected error occurred.';

      if (error.status === 0) {
        message = 'Network error: Please check your internet connection.';
      } else if (error.status >= 500) {
        message = 'Server error: Please try again later.';
      } else if (error.status === 401) {
        message = 'Unauthorized: Please login again.';
      } else if (error.status === 403) {
        message = 'Access denied: You do not have permission.';
      } else if (error.status === 404) {
        message = 'Not found: The resource was not found.';
      }

      notifier.showError(message);

      return throwError(() => error);
    })
  );
};
