import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();

  constructor(private _http: HttpClient) {}

  getPosts() {
    // return [...this.posts];
    return this._http
      .get<{ message: string; posts: Post[] }>(
        'http://localhost:3200/api/posts'
      )
      .subscribe((data) => {
        this.posts = data.posts;
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
      .post<{ message: string }>('http://localhost:3200/api/posts', post)
      .subscribe((resposneData) => {
        console.log(resposneData);
        this.posts.push(post);
        this.postUpdated.next([...this.posts]);
      });
  }
}
