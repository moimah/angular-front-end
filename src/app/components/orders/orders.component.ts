import { Component, OnInit } from '@angular/core';
import { Delivery } from '../../models/delivery';
import { HttpClientService } from '../../service/http-client.service';
import { ShopingCartService } from '../../service/shoping-cart.service';
import { User } from '../../models/user';
import { Detail2 } from 'src/app/models/detail2';
import { Order } from '../../models/order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  user: User;
  deliveries: Delivery[] = [];
  allDetails: Detail2[] = [];
  wrapperCalculator: any[] = [];

  constructor(public httpClientService: HttpClientService, public shopingCartService: ShopingCartService) { }

  ngOnInit(): void {
    this.getUser();
    this.getAllDetails();
  }

  /**
   * Get current username from sessionStorage
   * Search all users and check if username has deliveries
   * and call getDeliveries
   */
  getUser(){
    let username = sessionStorage.getItem("username");
    this.httpClientService.getUsers().subscribe(
      (data) => {
          for(let u of data){
            if(u.username == username){
              this.user = u;
              this.getDeliveries();
              break;
            }
          }
      }
    )
  }

  /**
   * If user is admin get all deliveries
   * If user is customer get only customer deliveries
   */
  getDeliveries(){

    if(this.user.type != 'administrator'){

      this.httpClientService.getDeliveryByUserId(this.user.id).subscribe(
        (data) => {
          this.deliveries  = data;
        }
      )
    }else{
       this.httpClientService.getDeliveries().subscribe(
        (data) => {
          this.deliveries  = data;
        }
      )

    }

  }

  /**
   * Get all details from database
   */
  getAllDetails() {
    this.httpClientService.getDetails().subscribe(
      (data) => {
        this.allDetails = data;
      }
    );
  }

  /**
   * Fill in a wrapper method and array with
   * [0] details[] from order/delivery
   * [1] numItems of order/delivery
   * [2] totalPrice
   * @param order
   */
  fillWrapperCalculator(order: Order){

    let numItems = 0;
    let total = 0;
    let orderDetails: Detail2[] = [];

    for(let d of this.allDetails){


      if(d.order.id == order.id){
        orderDetails.push(d);
        numItems += (d.uds)
        total += (d.uds * d.price)
      }
    }

    this.wrapperCalculator[0] = orderDetails;
    this.wrapperCalculator[1] = numItems;
    this.wrapperCalculator[2] = total;

    return this.wrapperCalculator;

  }

  /**
   * Show a promp alert to modify the user status in databse
   * @param order
   */
  editStatus(order: Order){

    let status = prompt("Enter order status : ", "sent");

    if(status != null){
      status.trim();
      order.status = status;
      this.httpClientService.updateOrder(order).subscribe(
        (response) => {
          this.getAllDetails();
        }
      )
    }

   }
}
