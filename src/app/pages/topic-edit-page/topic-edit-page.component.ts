import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TopicService} from '../../shared/services/topic.service';
import {Topic} from '../../shared/models/topic.model';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-topic-edit-page',
  templateUrl: './topic-edit-page.component.html',
  styleUrls: ['./topic-edit-page.component.scss']
})
export class TopicEditPageComponent implements OnInit, OnDestroy {
  public newTopicForm: FormGroup;
  private subs: Subscription[] = [];
  private topic: Topic;

  constructor(private formBuilder: FormBuilder,
              private ts: TopicService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.newTopicForm = this.formBuilder.group({
      topicTitle: ['', Validators.required],
      topicDescription: ['', Validators.required]
    });

    this.subs.push(this.route.params.subscribe(
      params => {
        if (params.hasOwnProperty('id')) {
          this.subs.push(this.ts.getTopicById(params['id'])
            .subscribe(
              topic => {
                this.topic = topic;
                this.newTopicForm.get('topicTitle').setValue(this.topic.title);
                this.newTopicForm.get('topicDescription').setValue(this.topic.description);
              },
              error => console.log(error)
            ));
        }
      }
    ));


  }

  ngOnDestroy(): void {
    this.subs.forEach(value => value.unsubscribe());
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

      if (this.topic) {
        // Update existing topic
        this.subs.push(this.ts.updateTopic(tempTopic)
          .subscribe(
            () => {
              this.router.navigate(['', 'topic', this.topic.id]);
              console.log('Topic created');
            },
            error2 => console.log(error2)));
      } else {
        // Create a new topic
        this.subs.push(this.ts.createNewTopic(tempTopic)
          .subscribe(
            () => {
              this.router.navigate(['']);
              console.log('Topic created');
            },
            error2 => console.log(error2)));
      }


    }
  }
}

