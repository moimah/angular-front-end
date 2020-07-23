import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { User } from '../../../../models/user';
import { HttpClientService } from '../../../../service/http-client.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-viewuser',
  templateUrl: './viewuser.component.html',
  styleUrls: ['./viewuser.component.css']
})
export class ViewuserComponent implements OnInit {

  @Input()
  user: User

  @Output()
  userDeletedEvent = new EventEmitter();

  //Inject HttpClientService and router
  constructor(private httpClientService: HttpClientService,
    private router: Router) { }

  ngOnInit(): void {
  }

  /**
   * Delete user function
   */
  deleteUser() {
    this.httpClientService.deleteUser(this.user.id).subscribe(
      (user) => {
        this.userDeletedEvent.emit();
        this.router.navigate(['admin', 'users']);
      }
    );
  }


}
