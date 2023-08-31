import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();

  constructor(private _http: HttpClient) {}

  getPosts() {
    // return [...this.posts];
    return this._http
      .get<{ message: string; posts: any }>('http://localhost:3200/api/posts')
      .pipe(
        map((postData) => {
          return postData.posts.map((post: any) => {
            return {
              title: post.title,
              content: post.content,
              id: post._id,
            };
          });
        })
      )
      .subscribe((transformerPosts) => {
        this.posts = transformerPosts;
        this.postUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = {
      id: '',
      title: title,
      content: content,
    };
    this._http
      .post<{ message: string; postId: string }>(
        'http://localhost:3200/api/posts',
        post
      )
      .subscribe((responseData) => {
        const id = responseData.postId;
        post.id = id;
        this.posts.push(post);
        this.postUpdated.next([...this.posts]);
      });
  }

  deletePost(postId: string) {
    this._http
      .delete('http://localhost:3200/api/posts/' + postId)
      .subscribe(() => {
        const updatedPost = this.posts.filter((post) => post.id !== postId);
        this.posts = updatedPost;
        this.postUpdated.next([...this.posts]);
      });
  }
}
