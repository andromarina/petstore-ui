import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ErrorService } from './error.service';

export const httpErrorInterceptor: HttpInterceptorFn = (request, next) => {

  const errors = inject(ErrorService);

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      errors.show(error.error?.message ?? error.message);
      return throwError(() => error);
    }),
  );
};
