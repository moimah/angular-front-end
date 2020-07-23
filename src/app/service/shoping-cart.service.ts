import { Injectable } from "@angular/core";
import { Detail } from "../models/detail";
import { Cart } from '../models/cart';
import { User } from '../models/user';
import { HttpClientService } from './http-client.service';
import { Order } from '../models/order';
import { Detail2 } from '../models/detail2';
import { DetailId } from '../models/detailId';


@Injectable({
  providedIn: "root",
})
export class ShopingCartService {

  user: User;
  order: Order;
  cart: Cart;
  cartPlants: any = [];

  numItemsInCart: number = 0;

  //TODO
  details: Detail[] = [];
  details2: Detail2[] = [];

  constructor(public httpClientService: HttpClientService) {
    this.getUser();
  }

  /**
   * Refresh info updating the cart
   */
  updateCart() {

    //Check if user has order shopping and if not create new order
    this.httpClientService.getLastShoppingOrder(this.user.id).subscribe(
      (data) => {

        this.order = data;
        //if this user has no orders create new
        if (this.order == null) {
          this.createOrder(this.user);
        } else {
          //else shopping cart
          this.getShoppingCartDetails(this.order.id);
        }
      },
      (error) => {
        if (this.order == null) {
          this.createOrder(this.user.id);
        }
      }
    );
  }

  /**
   * Create a shopping order for current user
   * with date now
   * @param user
   */
  createOrder(user) {
    this.order = new Order();
    this.order.user = user;
    this.order.status = "shopping";
    this.order.orderDate = new Date();
    this.httpClientService
      .createOrder(this.order)
      .subscribe((response) =>{ this.updateCart()})
  }

  updateOrder(status){
    this.order.status = status;
    this.httpClientService.updateOrder(this.order).subscribe(
      (response) => {
        this.updateCart();
      }
    )
  }

  /**
   * Get from database shoppingCart details with current orderId
   * Also call function to calculate numItems in cart
   * @param orderId
   */
  getShoppingCartDetails(orderId) {
    this.httpClientService.getOrderDetails(orderId).subscribe(
      (data) => {
        console.log(data);
        this.details2 = data;
        this.getNumItemsInCart(this.details2);
      },
      (error) => {
        console.log("ERROR");
      }
    );
  }

  /**
   * Calculate numItems in cart from cart
   * @param details
   */
  getNumItemsInCart(details) {
    this.numItemsInCart = 0;
    for (let detail of details) {
      this.numItemsInCart += detail.uds;
    }
  }


  /**
   * Calculate total to pay with details data
   */
  calculateTotalToPay() {
    let total: number = 0;
    for (let detail of this.details2) {
      total += detail.price * detail.uds;
    }
    return total;
  }

  /**
   * Add new plant to database
   * @param plant
   */
  addPlant(plant) {

    let exist = false;
    let detail: Detail2;

    //check if the cart has details of that product
    for (let item of this.details2) {
      console.log(item.plant);
      if(item.plant.id  == plant.id){
        exist = true;
        detail = item;
        break;
      }
    }

    //If exist update detail
    if (exist) {
      detail.uds++;
      this.httpClientService.updateDetail(detail).subscribe((response) => {
        this.updateCart();
      });
    } else {
      //If not create new detail
      let detailId: DetailId = new DetailId();
      detailId.orderId = this.order.id;
      detailId.plantId = plant.id;

      detail = new Detail2();
      detail.id = detailId;
      detail.order = this.order;
      detail.plant = plant;
      detail.price = plant.price;
      detail.uds = 1;

      this.httpClientService.createDetail(detail).subscribe((response) => {
        this.updateCart();
      });
    }
  }

  /**
   * Delete one plant
   * @param plant
   */
  deleteOnePlant(plant) {

    let exist = false;
    let detail: Detail2;

    //check if the cart has details of that product
    for (let item of this.details2) {
      console.log(item.plant);
      if(item.plant.id  == plant.id){
        exist = true;
        detail = item;
        break;
      }
    }
    //If exist check num of units and udate or delete
    if(exist){

      //if there are products update
      if(detail.uds > 1){
        detail.uds--;
        this.httpClientService.updateDetail(detail).subscribe((response) => {
          this.updateCart();
        });
      }else{ //else delete
        this.httpClientService.deleteDetail(detail.id.orderId, detail.id.plantId).subscribe((response) => {
          this.updateCart();
        });
      }

    }

  }

  /**
   * Clear the cart
   */
  emptyCart() {
    if (window.confirm("Do you really want to empty the cart?")) {
      this.httpClientService.deleteDetailsByOrderId(9).subscribe((response) => {
        this.updateCart();
      });
    }
  }


  /**
   * DeleteDetail
   * @param detail
   */
  deletePlant(detail) {
      this.httpClientService.deleteDetail(detail.id.orderId, detail.id.plantId).subscribe((response) => {
        this.updateCart();
      });
  }


 /**
  * Check how many items in shopping cart
  * @param plant
  */
  checkQty(plant) {

    let qty = 0;
    for(let detail of this.details2){
      if(plant.id == detail.plant.id){
         qty = detail.uds;
      }
    }

    return qty;
  }

  //Get user from session storage and check in database
  //With user info update the cart
  getUser(){
    let username = sessionStorage.getItem("username");
    this.httpClientService.getUsers().subscribe(
      (data) => {
          for(let u of data){
            if(u.username == username){
              this.user = u;
              this.updateCart();
              break;
            }
          }
      }
    )
  }
}
