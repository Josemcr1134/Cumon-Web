import { inject } from '@angular/core';
import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { catchError, BehaviorSubject, filter, switchMap, take, throwError, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

const isRefreshing = new BehaviorSubject<boolean>(false);
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authSvc = inject(AuthService);
  const router = inject(Router);

  return next(req).pipe(
    switchMap(event => {
      if (
        event instanceof HttpResponse &&
        req.url.startsWith(environment.baseUrl)
      ) {
        const body = event.body as any;

        if (
          body &&
          Array.isArray(body.errors) &&
          body.errors.some((error: any) => error?.extensions?.code === 'FORBIDDEN')
        ) {
          return refreshToken(req, next, authSvc, router);
        }
      }
      return of(event);
    }),
    catchError((error) => throwError(() => error))
  );
};

const refreshToken = (
  req: HttpRequest<any>,
  next: HttpHandlerFn,
  authSvc: AuthService,
  router: Router
) => {
  if (!isRefreshing.value) {
    isRefreshing.next(true);

    return authSvc.refreshToken(
      { refreshToken: sessionStorage.getItem('refreshToken') }
    ).pipe(
      switchMap((resp: any) => {
        isRefreshing.next(false);

        const accessToken = resp.data.accessToken;
        const refreshToken = resp.data.refreshToken;

        sessionStorage.setItem('accessToken', accessToken);
        sessionStorage.setItem('refreshToken', refreshToken);

        refreshTokenSubject.next(accessToken);

        return next(addTokenHeader(req, accessToken));
      }),
      catchError((err) => {
        isRefreshing.next(false);
        handleAuthError(router);
        return throwError(() => err);
      })
    );
  } else {
    return refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap((token) => next(addTokenHeader(req, token!)))
    );
  }
};

const addTokenHeader = (req: HttpRequest<any>, token: string) => {
  return req.clone({
    headers: req.headers
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json'),
  });
};

const handleAuthError = (router: Router) => {
  router.navigateByUrl('/auth/login');
};

// ||
//           body &&
//           Array.isArray(body.errors) &&
//           body.errors.some((error: any) => error?.extensions?.code === 'DOWNSTREAM_SERVICE_ERROR')
