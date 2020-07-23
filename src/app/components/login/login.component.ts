import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../service/authentication.service';
import { HttpClientService } from '../../service/http-client.service';
import { ShopingCartService } from '../../service/shoping-cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';
  invalidLogin = false;

  /**
   * Inject neccesary services
   * @param router
   * @param loginservice
   * @param httpClientService
   * @param shopingCartService
   */
  constructor(private router: Router,
    private loginservice: AuthenticationService,
    private httpClientService: HttpClientService,
    private shopingCartService: ShopingCartService) { }

  ngOnInit() {
  }

  /**
   * log the user, check if login is Ok, check if user is admin
   * upload the userCart and show the shop
   */
  checkLogin() {
    (this.loginservice.authenticate(this.username, this.password).subscribe(
      data => {
        this.router.navigate([''])
        this.invalidLogin = false;

        this.isUserAdmin();
        this.router.navigate(['shop']);
        this.shopingCartService.updateCart();


      },
      error => {
        this.invalidLogin = true;
      }
    )
    );

  }

  /**
   * Compare user from user list and save
   * userType administrator or customer   *
   */
  isUserAdmin(){
    let users = [];
    (this.httpClientService.getUsers().subscribe(
      data => {
        users = data;
        for(let u of data){
          if(u.username == this.username){
            if(u.type == 'administrator'){
              sessionStorage.setItem('type', 'administrator');
            }else{
              sessionStorage.setItem('type', 'customer');
            }
            break;
          }
        }
      }
    ))

  }

}
