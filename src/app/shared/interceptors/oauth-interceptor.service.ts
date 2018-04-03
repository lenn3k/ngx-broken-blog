import { Injectable, Inject, Optional } from '@angular/core';
import { OAuthModuleConfig, OAuthResourceServerErrorHandler, OAuthService, OAuthStorage } from 'angular-oauth2-oidc';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class OauthInterceptorService implements HttpInterceptor {

  constructor(
    private authStorage: OAuthStorage,
    private oAuthService: OAuthService,
    private errorHandler: OAuthResourceServerErrorHandler,
    @Optional() private moduleConfig: OAuthModuleConfig
  ) { }

  private checkUrl(url: string): boolean {
    const found = this.moduleConfig.resourceServer.allowedUrls.find(u => url.startsWith(u));
    return !!found;
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const url = req.url.toLowerCase();

    if (!this.moduleConfig) { return next.handle(req); }
    if (!this.moduleConfig.resourceServer) { return next.handle(req); }
    if (!this.moduleConfig.resourceServer.allowedUrls) { return next.handle(req); }
    if (!this.checkUrl(url)) { return next.handle(req); }

    const sendAccessToken = this.moduleConfig.resourceServer.sendAccessToken;
    console.log('interceptor log \n' + 'sendAccessToken:' + sendAccessToken + '\n'
      + 'validAccessToken: ' + this.oAuthService.hasValidAccessToken());
    if (this.oAuthService.hasValidAccessToken()) {

      const token = this.authStorage.getItem('access_token');
      const header = 'Bearer ' + token;

      const headers = req.headers
        .set('Authorization', header);

      req = req.clone({ headers });
    }

    return next.handle(req).pipe(
      catchError(err => this.errorHandler.handleError(err))
    );

  }

}
