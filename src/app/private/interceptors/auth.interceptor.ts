import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { Inject } from '@angular/core';
import { Observable } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<any> => {
  console.debug('Intercepting request', req);

  const token = sessionStorage.getItem('token');
  if (token) {
    const clonedReq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + token),
    });
    return next(clonedReq);
  } else {
    return next(req);
  }
};
