import {Component, OnInit} from '@angular/core';
import {TopicService} from '../../shared/services/topic.service';
import {Topic} from '../../shared/models/topic.model';
import {Post} from '../../shared/models/post.model';
import {PostService} from '../../shared/services/post.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {OAuthService} from 'angular-oauth2-oidc';

@Component({
  selector: 'app-board-index-page',
  templateUrl: './board-index-page.component.html',
  styleUrls: ['./board-index-page.component.scss']
})
export class BoardIndexPageComponent implements OnInit {

  public topicList: Topic[] = [];
  public postList: Post[] = [];
  public loginForm: FormGroup;

  constructor(private ts: TopicService,
              private ps: PostService,
              private fb: FormBuilder,
              private oAuthService: OAuthService) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      loginUsername: ['', Validators.required],
      loginPassword: ['', Validators.required],
      loginRemember: false
    });

    this.ts.getAllTopics().subscribe(
      result => {
        this.topicList = result.map(topic => {
          topic.posts = topic.posts.reverse();
          return topic;
        });
      },
      error => {
        console.error(error);
      });

    this.ps.getAllPosts().subscribe(
      result => {
        this.postList = result.reverse().slice(0, 7);
      },
      error => {
        console.error(error);
      });
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


  isLoggedIn(): boolean {
    return this.oAuthService.hasValidAccessToken();
  }
}
