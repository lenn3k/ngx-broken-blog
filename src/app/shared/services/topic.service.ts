import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Topic} from '../models/topic.model';

@Injectable()
export class TopicService {

  constructor(private http: HttpClient) {
  }

  getAllTopics() {
    return this.http.get<Topic[]>(`${environment.backEndUrl}/topics`);
  }

  createNewTopic(newTopic: Topic) {
    return this.http.post(`${environment.backEndUrl}/topics`, newTopic);

  }
}
