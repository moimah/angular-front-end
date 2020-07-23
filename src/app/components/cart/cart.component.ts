import { Component, OnInit } from '@angular/core';
import { Detail } from '../../models/detail';
import { ShopingCartService } from '../../service/shoping-cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(public shopingCartService: ShopingCartService,
    private router: Router) { }

  ngOnInit(): void {
  }
  /**
   * Use router to navigate to checkOut form
   */
  checkOut(){
    this.router.navigate(['checkout'])
  }



}
