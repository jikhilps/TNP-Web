import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Post } from 'src/Class/Post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  PostListRef: AngularFireList<any>;
  PostRef: AngularFireObject<any>;
  constructor(private db: AngularFireDatabase) { }

 CreatePost(post:Post)
  {
    this.PostListRef = this.db.list('/Posts');
    return this.PostListRef.push(post);
  }

  GetPostList() {
    this.PostListRef = this.db.list('/Posts');
    return this.PostListRef;
  }

  updatePost(id, post: Post) {
    this.PostRef = this.db.object('/Posts/' + id);
    return this.PostRef.update(post)
  }

  GetPost(id: string) {
    this.PostRef = this.db.object('/Posts/' + id);
    return this.PostRef;
  }

  DeletePost(id: string) {
    this.PostRef = this.db.object('/Posts/' + id);
    this.PostRef.remove();
  }

}
