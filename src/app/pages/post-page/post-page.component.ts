import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Post} from '../../shared/models/post.model';
import {Comment} from '../../shared/models/comment.model';
import {PostService} from '../../shared/services/post.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit, OnDestroy {

  public post: Post;
  public newCommentBody = '';
  public editing: boolean;
  public editCommentBody: string;
  public editPostBody: string;
  public editPostTitle: string;
  private subs: Subscription[] = [];
  private topicId: string;
  private postId: string;

  constructor(private ps: PostService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.subs.push(this.route.params.subscribe(
      params => {
        this.topicId = params['topicId'];
        this.postId = params['postId'];
        this.refreshPost();
      }));

  }

  ngOnDestroy(): void {
    this.subs.forEach(value => value.unsubscribe());
  }

  deletePost() {
    this.subs.push(this.ps.deletePostById(this.postId)
      .subscribe(
        () => this.router.navigate(['']),
        error => console.error(error)));
  }

  editPost() {
    this.editing = !this.editing;
    this.editPostBody = this.post.body;
    this.editPostTitle = this.post.title;
  }


  replyWithQuote(comment?: Comment) {
    let quote;
    if (comment) {
      quote = comment.body;
    } else {
      quote = this.post.body;
    }

    this.newCommentBody = this.newCommentBody.concat(
      `<blockquote>${quote}</blockquote>`
    );

  }

  deleteComment(comment: Comment) {

    this.subs.push(this.ps.deleteCommentByIdAndPostId(this.postId, comment.id.toString())
      .subscribe(
        () => this.refreshPost(),
        error => console.error(error)));
  }

  editComment(comment: Comment) {
    comment['editing'] = !comment['editing'];
    this.editCommentBody = comment.body;

  }

  createComment() {
    const tempComment: Comment = {};
    tempComment.body = this.newCommentBody;
    this.subs.push(this.ps.createCommentForPostId(this.postId, tempComment)
      .subscribe(
        () => this.refreshPost(),
        error => console.error(error)));
  }

  updateComment(comment: Comment) {
    const tempComment: Comment = {};
    Object.assign(tempComment, comment);
    tempComment.body = this.editCommentBody;
    this.subs.push(this.ps.updateCommentForPostId(this.postId, tempComment)
      .subscribe(
        () => this.refreshPost(),
        error => console.error(error)));
  }

  undoChanges(comment: Comment) {
    comment['editing'] = false;
    this.editing = false;
  }

  updatePost() {
    const tempPost: Post = {};
    Object.assign(tempPost, this.post);
    tempPost.body = this.editPostBody;
    tempPost.title = this.editPostTitle;
    this.subs.push(this.ps.updatePost(tempPost)
      .subscribe(
        () => this.refreshPost(),
        error => console.error(error)));
  }

  private refreshPost() {
    this.subs.push(this.ps.getPostById(this.postId)
      .subscribe(
        post => {
          this.post = post;
          this.newCommentBody = '';
          this.editing = false;
        },
        error => console.error(error)
      ));
  }
}
