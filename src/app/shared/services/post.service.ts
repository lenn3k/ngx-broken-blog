import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Post} from '../models/post.model';
import {Comment} from '../models/comment.model';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class PostService {

  constructor(private http: HttpClient) {
  }


  getPostById(id: string) {
    return this.http.get<Post>(`${environment.backEndUrl}/posts/${id}`);
  }

  deletePostById(id: string) {
    return this.http.delete(`${environment.backEndUrl}/posts/${id}`);
  }

  createCommentForPostId(postId: string, comment: Comment) {
    return this.http.post(`${environment.backEndUrl}/posts/${postId}/comments`, comment);
  }

  deleteCommentByIdAndPostId(postId: string, commentId: string) {
    return this.http.delete(`${environment.backEndUrl}/posts/${postId}/comments/${commentId}`,);
  }

  updateCommentForPostId(postId: string, tempComment: Comment) {
    return this.http.put(`${environment.backEndUrl}/posts/${postId}/comments`, tempComment);

  }
}
