import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {TopicService} from '../../shared/services/topic.service';
import {Subscription} from 'rxjs/Subscription';
import {Post} from '../../shared/models/post.model';

@Component({
  selector: 'app-post-edit-page',
  templateUrl: './post-edit-page.component.html',
  styleUrls: ['./post-edit-page.component.scss']
})
export class PostEditPageComponent implements OnInit, OnDestroy {
  public newPostForm: FormGroup;

  private subs: Subscription[] = [];
  private topicId: any;


  constructor(private formBuilder: FormBuilder,
              private ts: TopicService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.newPostForm = this.formBuilder.group({
      postTitle: ['', Validators.required],
      postBody: ['', Validators.required]
    });

    this.subs.push(this.route.params.subscribe(
      params => {
        this.topicId = params['id'];
      }
    ));

  }

  ngOnDestroy(): void {
    this.subs.forEach(value => value.unsubscribe());
  }

  submitPost() {
    if (this.newPostForm.get('postTitle').valid &&
      this.newPostForm.get('postBody').valid) {
      const tempPost: Post = {};
      tempPost.title = this.newPostForm.get('postTitle').value;
      tempPost.body = this.newPostForm.get('postBody').value;

      this.subs.push(this.ts.createPostForTopicById(tempPost, this.topicId)
        .subscribe(
          () => {
            this.router.navigate(['', 'topic', this.topicId]);
            console.log('Topic created');
          },
          error2 => console.log(error2)));
    }
  }
}
