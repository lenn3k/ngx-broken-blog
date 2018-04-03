import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {OAuthService} from 'angular-oauth2-oidc';

@Injectable()
export class AuthGuard implements CanActivate {


  constructor(private oauthService: OAuthService , private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.oauthService.hasValidAccessToken()) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }

}
