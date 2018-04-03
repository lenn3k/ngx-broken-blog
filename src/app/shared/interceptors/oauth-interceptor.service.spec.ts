import { TestBed, inject } from '@angular/core/testing';

import { OauthInterceptorService } from './oauth-interceptor.service';

describe('OauthInterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OauthInterceptorService]
    });
  });

  it('should be created', inject([OauthInterceptorService], (service: OauthInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
