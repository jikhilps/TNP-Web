import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { User } from 'src/Class/User';
import { UserService } from 'src/Service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.page.html',
  styleUrls: ['./user-list.page.scss'],
})
export class UserListPage implements OnInit {
  UserList:any[]=[];
  user=new User();

  constructor(private userService:UserService,private router:Router,public alertController: AlertController) { }

  ngOnInit() {
    this.GetUserList();
  }

  GetUserList()
  {
    let userlist = this.userService.GetUserList();
    userlist.snapshotChanges().subscribe(res => {
      this.UserList = [];
      res.forEach(item => {
        let uu=new User();
        let itm = item.payload.toJSON();
        uu.Id=item.key;
        uu.Name=itm['Name'];
        uu.Email=itm['Email'];
        uu.Mobile=itm['Mobile'];
      
        this.UserList.push(uu);
      })
      console.log( this.UserList);
      
    })

  
  }

  CreateUser()
  {
    let navigationExtras:NavigationExtras={
      state:{
      user:this.user

      } 
    }
    this.router.navigate(['user-details'],navigationExtras,);
  }

  EditUser(userdata)
  {
    let navigationExtras:NavigationExtras={
      state:{
      user:userdata

      } 
    }
    this.router.navigate(['user-details'],navigationExtras,);
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
            this.userService.DeleteUser(user.Id);
          }
        }
      ]
    });

    await alert.present();
  }

}
