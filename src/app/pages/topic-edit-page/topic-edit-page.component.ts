import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TopicService} from '../../shared/services/topic.service';
import {Topic} from '../../shared/models/topic.model';
import {ActivatedRoute, Router} from '@angular/router';
import {OAuthService} from 'angular-oauth2-oidc';

@Component({
  selector: 'app-topic-edit-page',
  templateUrl: './topic-edit-page.component.html',
  styleUrls: ['./topic-edit-page.component.scss']
})
export class TopicEditPageComponent implements OnInit {
  public newTopicForm: FormGroup;
  public topic: Topic;

  constructor(private formBuilder: FormBuilder,
              private ts: TopicService,
              private router: Router,
              private route: ActivatedRoute,
              private oAuthService: OAuthService) {
  }

  ngOnInit() {
    this.newTopicForm = this.formBuilder.group({
      topicTitle: ['', Validators.required],
      topicDescription: ['', Validators.required]
    });

    this.route.params.subscribe(
      params => {
        if (params.hasOwnProperty('id')) {
          this.ts.getTopicById(params['id'])
            .subscribe(
              topic => {
                this.topic = topic;
                this.newTopicForm.get('topicTitle').setValue(this.topic.title);
                this.newTopicForm.get('topicDescription').setValue(this.topic.description);
              },
              error => console.error(error)
            );
        }
      }
    );


  }


  submitTopic() {


    if (this.newTopicForm.get('topicTitle').valid &&
      this.newTopicForm.get('topicDescription').valid) {
      let tempTopic: Topic = {};

      if (this.topic) {
        tempTopic = this.topic;
      }

      tempTopic.title = this.newTopicForm.get('topicTitle').value;
      tempTopic.description = this.newTopicForm.get('topicDescription').value;

      const claims = this.oAuthService.getIdentityClaims();
      tempTopic.author = claims['preferred_username'];

      if (this.topic) {
        // Update existing topic
        this.ts.updateTopic(tempTopic)
          .subscribe(
            () => {
              this.router.navigate(['', 'topic', this.topic.id]);
              console.log('Topic created');
            },
            error2 => console.error(error2));
      } else {
        // Create a new topic
        this.ts.createNewTopic(tempTopic)
          .subscribe(
            () => {
              this.router.navigate(['']);
              console.log('Topic created');
            },
            error2 => console.error(error2));
      }


    }
  }
}

