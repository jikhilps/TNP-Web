import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Post } from 'src/Class/Post';
import { PostService } from 'src/Service/post.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.page.html',
  styleUrls: ['./view-post.page.scss'],
})
export class ViewPostPage implements OnInit {
   postDataId:any;
   PostData=new Post();

  constructor(private route: ActivatedRoute,private router:Router,private postservice:PostService) {
    var snapshot = route.snapshot;
    this.postDataId=snapshot.params["id"];
    this.GetPost();
   }

  ngOnInit() {
  }

  GetPost()
  {

    this.postservice.GetPost(this.postDataId).valueChanges().subscribe(res => {
    
      this.PostData=res;

    })
   
    
  }

}
