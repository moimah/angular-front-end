import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { Plant } from '../models/plant';
import { Employee } from '../models/employee';
import { Order } from '../models/order';
import { Detail2 } from '../models/detail2';
import { Detail } from '../models/detail';
import { Delivery } from '../models/delivery';


@Injectable({
  providedIn: 'root'
})


// Angular HTTPClient for calling the Spring Boot API to fetch the user data.
export class HttpClientService {

  constructor(private httpClient:HttpClient) { }

  //Make a GET call to Spring backend to get a collection of users
  getUsers(){
  return this.httpClient.get<User[]>('http://localhost:8080/users/get');
  }

  //Make a POST call to Spring backend to save the user.
  addUser(newUser: User) {
    return this.httpClient.post<User>('http://localhost:8080/users/add', newUser,  );
  }

  //Make a delete of user to Spring backend
  deleteUser(id) {
    return this.httpClient.delete<User>('http://localhost:8080/users/' + id);
  }


 //GET Call Spring backend to get a collection of plants
 getPlants() {
  return this.httpClient.get<Plant[]>('http://localhost:8080/plants/get');
}

//GET Call to filter plants
getPlantsFilter(name, min, max) {
  name.trim();
  if(name.length == 0){
    name = null;
  }
  return this.httpClient.get<Plant[]>(`http://localhost:8080/plants/filter/name/${name}/min/${min}/max/${max}`);
}

//POST to storage a new plant
addPlant(newPlant: Plant) {
    return this.httpClient.post<User>('http://localhost:8080/plants/add', newPlant );
}

//Delete a plant by id
deletePlant(id) {
  return this.httpClient.delete<Plant>('http://localhost:8080/plants/' + id );
}

//Update a existing plant
updatePlant(updatedPlant: Plant) {
  return this.httpClient.put<Plant>('http://localhost:8080/plants/update', updatedPlant);
}



  //Create a new user
 createUser(user){
   console.log(user);
  return this.httpClient.post<User>("http://localhost:8080/register", user);
 }

 //Create a new order
 createOrder(order){
  return this.httpClient.post<Order>("http://localhost:8080/orders/add", order);
}

//Update an existing order
updateOrder(order) {
  return this.httpClient.put<Order>('http://localhost:8080/orders/update', order);
}
//Get last shopping cart order
 getLastShoppingOrder(userId){
  return this.httpClient.get<Order>("http://localhost:8080/orders/lastcart" + "/" + userId);
}


//Get all details
getDetails(){
  return this.httpClient.get<Detail2[]>("http://localhost:8080/details/get" + "/");
}
//Get a list of details wit orderId
 getOrderDetails(orderId){
  return this.httpClient.get<Detail2[]>("http://localhost:8080/details/get/orderid" + "/" + orderId);
}

//Create a new detail
 createDetail(detail){
  return this.httpClient.post<Detail2>("http://localhost:8080/details/add", detail);
}

//Update a existing detail
 updateDetail(detail) {
  return this.httpClient.put<Detail2>('http://localhost:8080/details/update', detail);
}

//Delete a detail with orderd and plantId
 deleteDetail(orderId, plantId) {
  return this.httpClient.delete<Detail2>('http://localhost:8080/details/delete/orderid/' + orderId + '/plantid/' + plantId);
}

//Delete all details vinculated to a orderId
 deleteDetailsByOrderId(orderId){
  return this.httpClient.delete<Detail2>('http://localhost:8080/details/emptycart/' + orderId);
}


//Get all Deliveries
getDeliveries(){
  return this.httpClient.get<Delivery[]>('http://localhost:8080/deliveries/get');
}

//Get all deliveries from userId
getDeliveryByUserId(userId){
  return this.httpClient.get<Delivery[]>('http://localhost:8080/deliveries/get/userid/' + userId);
}

//Create a new delivery
createDelivery(delivery){
  return this.httpClient.post<Delivery>("http://localhost:8080/deliveries/add", delivery);
}


}
