import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {OAuthService} from 'angular-oauth2-oidc';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private oAuthService: OAuthService) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.oAuthService.hasValidAccessToken()) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
