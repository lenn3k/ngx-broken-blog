import {Post} from './post.model';


export interface Topic {
  author?: string;

  creationTime?: string;

  description?: string;

  id?: number;

  posts?: Array<Post>;

  title?: string;

}
