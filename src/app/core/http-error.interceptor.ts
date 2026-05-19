import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ErrorService } from './error.service';

export const httpErrorInterceptor: HttpInterceptorFn = (request, next) => {
  const errorService = inject(ErrorService);

  return next(request).pipe(
    catchError((error: unknown) => {
      if (error instanceof HttpErrorResponse) {
        const message =
          error.error?.message ?? error.message ?? `Request failed (${error.status})`;
        errorService.show(message);
      }

      return throwError(() => error);
    }),
  );
};
