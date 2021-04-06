import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConfig } from 'src/Class/AppConfig';
import { Post } from 'src/Class/Post';
import { PostService } from 'src/Service/post.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.page.html',
  styleUrls: ['./post-details.page.scss'],
})
export class PostDetailsPage implements OnInit {
  post = new Post();
  appconfig=new AppConfig();
 

  constructor(private postService: PostService, private router: Router, public activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.post = this.router.getCurrentNavigation().extras.state.post;
        
      }
    });
  }

  ngOnInit() {

  }
  back() {
    this.router.navigate(['post-list'])
  }

  InsertPost() {
    if (this.post.Id.length > 2) {
      this.postService.updatePost(this.post.Id, this.post)
    }
    else {
      let x = this.postService.CreatePost(this.post);
    }


    this.router.navigate(['post-list'])
  }

 




}
