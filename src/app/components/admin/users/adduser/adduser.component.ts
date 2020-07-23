import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../../../models/user';
import { HttpClientService } from '../../../../service/http-client.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  // user instance will be provided by the parent add user will be called.
  @Input()
  user: User

  //Emit changes to Parent
  @Output()
  userAddEvent = new EventEmitter();

  //Inject HttpClientService and the Router
  constructor(private httpClientService: HttpClientService,
    private router: Router) { }

  ngOnInit(): void {
  }

  /**
   * AddUser method if get user from databse navigate with
   * router to admin users
   */
  addUser() {
    this.httpClientService.addUser(this.user).subscribe(
      (user) => {
        //Emit changes
        this.userAddEvent.emit();
        this.router.navigate(['admin', 'users']);
      }
    );
  }
}
