import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, throwError, switchMap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const authService = inject(AuthService);
  const token = authService.getAccessToken();

  let authReq = req;
  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // Si recibimos un 401 y no es login/refresh, intentamos refrescar el token
      if (error.status === 401 && !req.url.includes('login') && !req.url.includes('refresh-token')) {
        return authService.refreshToken().pipe(
          switchMap((success) => {
            if (success) {
              const newToken = authService.getAccessToken();
              return next(req.clone({
                setHeaders: {
                  Authorization: `Bearer ${newToken}`
                }
              }));
            }
            authService.logout();
            return throwError(() => error);
          }),
          catchError((err) => {
            authService.logout();
            return throwError(() => err);
          })
        );
      }
      return throwError(() => error);
    })
  );
};
