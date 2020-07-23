import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { HttpClientService } from '../../../service/http-client.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

// if the url has action=add then the adduser page will be displayed.
// If the url has the  action=view then the view user page will be displayed.
export class UsersComponent implements OnInit {

  loading: boolean = true;
  //Colection of users
  users: Array<User>;

  //selected user
  selectedUser: User;
  action: string;

  //inject service, router and activatedRoute
  constructor(private httpClientService: HttpClientService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
      this.refreshData();
    }

  /**
   * Handle the response and asign to users[]
   * @param response
   */
  handleSuccessfulResponse(response) {
    this.users = response;
    this.loading = false;
  }




  /**
   * Fetch the user list from backend
   */
  refreshData() {
    this.loading = true;
    this.httpClientService.getUsers().subscribe(
      response => {
        this.handleSuccessfulResponse(response);
        console.log(response);
      },
    );

    this.activatedRoute.queryParams.subscribe(
      (params) => {
        this.action = params['action'];
        const selectedUserId = params['id'];
        if (selectedUserId) {
          this.selectedUser = this.users.find(user => user.id === +selectedUserId);
        }
      }
    );
  }


  /**
   * Use router with params to navigate to users info
   * @param id
   */
  viewUser(id: number) {
    this.router.navigate(['admin','users'], {queryParams : {id, action: 'view'}});
  }

  /**
   * Use router with params to navigate to add user form
   */
  addUser() {
    this.selectedUser = new User();
    this.router.navigate(['admin', 'users'], { queryParams: { action: 'add' } });
  }


}
