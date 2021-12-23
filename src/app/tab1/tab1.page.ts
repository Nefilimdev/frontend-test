/* eslint-disable arrow-body-style */
import { State } from './+state/post/posts.reducer';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Observable, throwError } from 'rxjs';
import * as PostsActions from './+state/post/posts.actions';
import * as CommentsActions from './+state/comments/comments.actions';
import * as UsersActions from './+state/user/users.actions';
import { getAllPosts } from './+state/post/posts.selectors';
import { getAllComments } from './+state/comments/comments.selectors';
import { getAllUsers } from './+state/user/users.selectors';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  posts$: Observable<any>;
  comments$: Observable<any>;
  users$: Observable<any>;
  combinedPosts$: Observable<any>;

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.store.dispatch(PostsActions.init());
    this.posts$ = this.store.select(getAllPosts);

    this.store.dispatch(CommentsActions.loadComments());
    this.comments$ = this.store.select(getAllComments);

    this.store.dispatch(UsersActions.loadUsers());
    this.users$ = this.store.select(getAllUsers);

    // REFACTOR: refatorar código para otimizar o retorno do users
    this.combinedPosts$ = combineLatest([
      this.posts$,
      this.comments$,
      this.users$,
    ]).pipe(
      map(([posts, comments, users]) => {
        return posts.map((post) => {
          return {
            ...post,
            comments: comments.filter((comment) => {
              if (comment.postId === post.id) {
                return comment;
              }
            }),
            user: users.find((user) => user.id === post.userId),
          };
        });
      }, catchError(this.handleError))
    );
    // this.combinedPosts$.subscribe((combined) => {
    //   console.log('Aqui', combined);
    // });
  }

  private handleError(error: Error) {
    return throwError(() => {
      return 'Ocorreu um erro, por favor tente novamente!';
    });
  }
}
