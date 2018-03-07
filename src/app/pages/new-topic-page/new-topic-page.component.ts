import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TopicService} from '../../shared/services/topic.service';
import {Topic} from '../../shared/models/topic.model';
import {Subscription} from 'rxjs/Subscription';
import {Router} from '@angular/router';

@Component({
  selector: 'app-new-topic-page',
  templateUrl: './new-topic-page.component.html',
  styleUrls: ['./new-topic-page.component.scss']
})
export class NewTopicPageComponent implements OnInit, OnDestroy {
  newTopicForm: FormGroup;
  private subs: Subscription[] = [];

  constructor(private formBuilder: FormBuilder,
              private ts: TopicService,
              private router: Router) {
  }

  ngOnInit() {
    this.newTopicForm = this.formBuilder.group({
      topicTitle: ['', Validators.required],
      topicDescription: ['', Validators.required]
    });
  }

  ngOnDestroy(): void {
    this.subs.forEach(value => value.unsubscribe());
  }

  submitNewTopic() {

    if (this.newTopicForm.get('topicTitle').valid &&
      this.newTopicForm.get('topicDescription').valid) {

      const newTopic: Topic = {};
      newTopic.title = this.newTopicForm.get('topicTitle').value;
      newTopic.description = this.newTopicForm.get('topicDescription').value;

      this.subs.push(this.ts.createNewTopic(newTopic)
        .subscribe(
          () => {
            this.router.navigate(['']);
            console.log('Topic created');
          },
          error2 => console.log(error2)));
    }
  }
}

