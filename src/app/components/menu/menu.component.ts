import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../service/authentication.service';
import { ShopingCartService } from '../../service/shoping-cart.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(public loginService: AuthenticationService, public shopingCartService: ShopingCartService) { }

  ngOnInit(): void {
  }


}
