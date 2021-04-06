import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Post } from 'src/Class/Post';
import { PostService } from 'src/Service/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.page.html',
  styleUrls: ['./post-list.page.scss'],
})
export class PostListPage implements OnInit {
  PostList:any[]=[];
  

  constructor(private postservice:PostService,private router:Router,public alertController: AlertController) { }

  ngOnInit() {
    this.GetPostList();
  }

  GetPostList()
  {
    let postlist = this.postservice.GetPostList();
    postlist.snapshotChanges().subscribe(res => {
      this.PostList = [];
      res.forEach(item => {
        let uu=new Post();
        let itm = item.payload.toJSON();
        uu.Id=item.key;
        uu.Header=itm['Header'];
        uu.Content=itm['Content'];
       
      
        this.PostList.push(uu);
      })
     
      
    })

  
  }

  CreateUser()
  {
    let px=new Post();
    let navigationExtras:NavigationExtras={
      state:{
      post:px

      } 
    }
    this.router.navigate(['post-details'],navigationExtras,);
  }

  EditUser(postdata)
  {
    let navigationExtras:NavigationExtras={
      state:{
      post:postdata

      } 
    }
    this.router.navigate(['post-details'],navigationExtras,);
  }

  DeleteUser(user)
  {
    //this.userService.DeleteUser(user.Id);
    this.presentAlertMultipleButtons(user)
  }

  async presentAlertMultipleButtons(user) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Are You Sure You Want Delete??',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'cancel-btn',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Delete',
          handler: () => {
            this.postservice.DeletePost(user.Id);
          }
        }
      ]
    });

    await alert.present();
  }


  GotoPost(Id)
  {
 
    
    this.router.navigate(['view-post',Id])
    //this.router.navigateByUrl('post-details/42')
  }
}
