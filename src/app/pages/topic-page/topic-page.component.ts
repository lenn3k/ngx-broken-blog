import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {TopicService} from '../../shared/services/topic.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Topic} from '../../shared/models/topic.model';
import {OAuthService} from 'angular-oauth2-oidc';

@Component({
  selector: 'app-topic-page',
  templateUrl: './topic-page.component.html',
  styleUrls: ['./topic-page.component.scss']
})
export class TopicPageComponent implements OnInit, OnDestroy {

  public topic: Topic;
  private subs: Subscription[] = [];
  private topicId: string;

  constructor(private ts: TopicService,
              private route: ActivatedRoute,
              private router: Router,
              private oAuthService: OAuthService) {
  }

  ngOnInit() {
    this.subs.push(this.route.params.subscribe(
      params => {
        this.topicId = params['id'];
        this.subs.push(this.ts.getTopicById(this.topicId)
          .subscribe(
            topic => this.topic = topic,
            error => console.error(error)));
      }));

  }

  ngOnDestroy(): void {
    this.subs.forEach(value => value.unsubscribe());
  }

  deleteTopic() {
    this.subs.push(this.ts.deleteTopicById(this.topic.id)
      .subscribe(
        () => this.router.navigate(['']),
        error => console.error(error)));
  }

  editTopic() {

  }

  isLoggedIn() {
    return this.oAuthService.hasValidAccessToken();
  }
}
