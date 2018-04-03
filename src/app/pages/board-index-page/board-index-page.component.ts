import {Component, OnDestroy, OnInit} from '@angular/core';
import {TopicService} from '../../shared/services/topic.service';
import {Subscription} from 'rxjs';
import {Topic} from '../../shared/models/topic.model';
import {Post} from '../../shared/models/post.model';
import {PostService} from '../../shared/services/post.service';
import {OAuthService} from 'angular-oauth2-oidc';
import {authPasswordFlowConfig} from '../../auth-password.config';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-board-index-page',
  templateUrl: './board-index-page.component.html',
  styleUrls: ['./board-index-page.component.scss']
})
export class BoardIndexPageComponent implements OnInit, OnDestroy {
  // todo shared component?
  userName: string;
  password: string;
  loginFailed = false;
  userProfile: object;

  private subs: Subscription[] = [];
  public topicList: Topic[] = [];
  public postList: Post[] = [];

  constructor(private ts: TopicService,
              private ps: PostService,
              private oAuthService: OAuthService
  ) {
    // todo fix login form on main page
    // this.oAuthService.configure(authPasswordFlowConfig);
    // this.oAuthService.loadDiscoveryDocument();
  }

  ngOnInit() {
    this.subs.push(this.ts.getAllTopics().subscribe(
      result => {
        this.topicList = result.map(topic => {
          topic.posts = topic.posts.reverse();
          return topic;
        });
      },
      error => {
        throw error;
      }));

    this.subs.push(this.ps.getAllPosts().subscribe(
      result => {
        this.postList = result.reverse().slice(0, 5);
      },
      error => {
        throw error;
      }));
  }

  ngOnDestroy(): void {
    this.subs.forEach(value => value.unsubscribe());
  }

  getCommentsForTopic(topic: Topic): number {
    let total = 0;
    if (topic) {
      if (topic.posts) {
        topic.posts.forEach(post => {
          if (post.comments) {
            total += post.comments.length;
          }
        });
      }
    }

    return total;

  }

  loadUserProfile(): void {
    this.oAuthService.loadUserProfile()
      .then(up => this.userProfile = up);
  }
  loggedin(): boolean {
    return this.oAuthService.hasValidAccessToken();
  }
  get givenName() {
    let claims = this.oAuthService.getIdentityClaims();
    if (!claims) return null;
    return claims['given_name'];
  }

  get familyName() {
    let claims = this.oAuthService.getIdentityClaims();
    if (!claims) return null;
    return claims['family_name'];
  }

  loginWithPass() {
    this.oAuthService.fetchTokenUsingPasswordFlowAndLoadUserProfile(this.userName , this.password)
      .then(() => {
        console.debug('login success!');
        this.loginFailed = false;
      })
      .catch((err) => {
        console.error('login error: ' + err);
        this.loginFailed = true;
      });
  }

  logout() {
    this.oAuthService.logOut(true);
  }

  goToRegisterPage(): void {
    window.location.href = environment.keycloak.registration + environment.keycloak.clientId;
  }
}
