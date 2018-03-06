import {Comment} from './comment.model';

export interface Post {
  author?: string;

  body?: string;

  comments?: Array<Comment>;

  creationTime?: string;

  id?: number;

  title?: string;

}
