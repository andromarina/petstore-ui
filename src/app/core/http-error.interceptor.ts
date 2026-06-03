import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { ErrorService } from './error.service';

export const httpErrorInterceptor: HttpInterceptorFn = (request, next) => {
  const errors = inject(ErrorService);
  const authService = inject(AuthService);
  const router = inject(Router);

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !request.url.includes('/auth/login')) {
        authService.logout();
        void router.navigate(['/login']);
      }

      if (!request.url.includes('/auth/login')) {
        errors.show(error.error?.message ?? error.message);
      }
      return throwError(() => error);
    }),
  );
};
