import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../service/authentication.service';
import { Router } from '@angular/router';
import { ShopingCartService } from '../../service/shoping-cart.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  /**
   * Inject neccesary services
   * @param authentocationService
   * @param router
   * @param shopingCartService
   */
  constructor(
    private authentocationService: AuthenticationService,
    private router: Router,
    ) {

  }

  /**
   * Logout the user, clear tempCart
   * and navigate to login page
   */
  ngOnInit() {
    this.authentocationService.logOut();
    this.router.navigate(['login']);
  }

}
