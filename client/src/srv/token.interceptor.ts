import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService) {
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Content-type : Spécialement pour le bon fonctionnement des requête http POST
    request = request.clone({
      setHeaders:
      {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    // Injection du token (authentification avec l'API, si nécessaire)
    if (this.auth.Token) {
      request = request.clone({
        setParams:
        {
          'token': this.auth.Token
        }
      });
    }

    return next.handle(request);
  }
}