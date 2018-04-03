import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Topic} from '../models/topic.model';
import {Post} from '../models/post.model';
import { Observable } from 'rxjs';

@Injectable()
export class TopicService {

  constructor(private http: HttpClient) {
  }

  getAllTopics(): Observable<Topic[]> {
    return this.http.get<Topic[]>(`${environment.backEndUrl}/topics`);
  }

  createNewTopic(newTopic: Topic) {
    return this.http.post(`${environment.backEndUrl}/topics`, newTopic);

  }

  getTopicById(id: string) {
    return this.http.get<Topic>(`${environment.backEndUrl}/topics/${id}`);
  }

  deleteTopicById(id: number) {
    return this.http.delete(`${environment.backEndUrl}/topics/${id}`);
  }

  updateTopic(topic: Topic) {
    return this.http.put(`${environment.backEndUrl}/topics/${topic.id}`, topic);
  }

  createPostForTopicById(post: Post, topicId: string) {
    return this.http.post(`${environment.backEndUrl}/topics/${topicId}/posts`, post);
  }
}
