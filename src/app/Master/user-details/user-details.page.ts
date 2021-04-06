import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/Class/User';
import { UserService } from 'src/Service/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.page.html',
  styleUrls: ['./user-details.page.scss'],
})
export class UserDetailsPage implements OnInit {
  user = new User();
  UserList: any[] = [];

  constructor(private userService: UserService, private router: Router, public activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.user = this.router.getCurrentNavigation().extras.state.user;
        if(this.user.Id.length>0)
        {
          this.GetUserDetails()
        }
      }
    });
  }

  ngOnInit() {
    this.GetUserList();
  }
  back() {
    this.router.navigate(['user-list'])
  }

  InsertUser() {
    if (this.user.Id.length > 2) {
      this.userService.updateUser(this.user.Id, this.user)
    }
    else {
      let x = this.userService.CreateUser(this.user);
    }


    this.router.navigate(['user-list'])
  }

  GetUserList() {
    let userlist = this.userService.GetUserList();
    userlist.snapshotChanges().subscribe(res => {
      this.UserList = [];
      res.forEach(item => {
        let uu = new User();
        let itm = item.payload.toJSON();
        uu.Id = item.key;
        uu.Name = itm['Name'];
        uu.Email = itm['Email'];
        uu.Mobile = itm['Mobile'];

        this.UserList.push(uu);
      })
    })
  }


  GetUserDetails()
  {
    this.userService.GetUser(this.user.Id).valueChanges().subscribe(res => {
     console.log(res);
     
    });
  }


}
