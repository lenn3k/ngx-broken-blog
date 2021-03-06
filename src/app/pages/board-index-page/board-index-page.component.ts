import {Component, OnDestroy, OnInit} from '@angular/core';
import {TopicService} from '../../shared/services/topic.service';
import {Subscription} from 'rxjs/Subscription';
import {Topic} from '../../shared/models/topic.model';
import {Post} from '../../shared/models/post.model';
import {PostService} from '../../shared/services/post.service';

@Component({
  selector: 'app-board-index-page',
  templateUrl: './board-index-page.component.html',
  styleUrls: ['./board-index-page.component.scss']
})
export class BoardIndexPageComponent implements OnInit, OnDestroy {

  private subs: Subscription[] = [];
  public topicList: Topic[] = [];
  public postList: Post[] = [];

  constructor(private ts: TopicService,
              private ps: PostService) {
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

}
