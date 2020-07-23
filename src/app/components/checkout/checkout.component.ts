import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ShopingCartService } from '../../service/shoping-cart.service';
import { Delivery } from '../../models/delivery';
import { HttpClientService } from '../../service/http-client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  orderSucces:boolean =  false;
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;

  constructor(public shopingCartService: ShopingCartService, public httpClientService: HttpClientService, private router: Router) { }

  ngOnInit(): void {
    this.shopingCartService.updateCart();
  }


  /**
   * Fill a checkout/delivery and storage in databse
   */
  onCheckOut(){

    //Create new delivery
    let delivery = new Delivery();
    delivery.order = this.shopingCartService.order;
    delivery.name = this.name;
    delivery.email = this.email;
    delivery.address = this.address;
    delivery.state  = this.state;
    delivery.zip = this.zip;

    this.httpClientService.createDelivery(delivery).subscribe(
      (response) => {
        //If was created update order status and update cart
          this.shopingCartService.updateOrder("paid");
          this.orderSucces = true;

          setTimeout(() => {
            this.router.navigate(['shop']);
        }, 2000);
      }
    );



  }


}
