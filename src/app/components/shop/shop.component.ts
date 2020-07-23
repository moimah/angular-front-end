import { Component, OnInit } from '@angular/core';
import { Plant } from '../../models/plant';
import { Router } from '@angular/router';
import { HttpClientService } from '../../service/http-client.service';
import { ShopingCartService } from '../../service/shoping-cart.service';
import { Order } from '../../models/order';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  plants: Array<Plant>;
  plantsRecieved: Array<Plant>;
  cartPlants: any;

  loading = true;
  searching = false;
  noResults = false;
  private subscription: Subscription;


  constructor(private router: Router, private httpClientService: HttpClientService, public shopingCartService: ShopingCartService) { }

  ngOnInit() {

    this.shopingCartService.getUser();

     this.httpClientService.getPlants().subscribe(
      response => this.handleSuccessfulResponse(response),
    );
  }



  /**
   * Take the plants resposnse from database
   * ad add the plantsReceived
   * @param response
   */
  handleSuccessfulResponse(response) {
    this.plantsRecieved = null;
    this.plants = new Array<Plant>();
    //get plants returned by the api call
    this.plantsRecieved = response;
    for (const plant of this.plantsRecieved) {

      const plantwithRetrievedImageField = new Plant();
      plantwithRetrievedImageField.id = plant.id;
      plantwithRetrievedImageField.name = plant.name;
      //populate retrieved image field so that plant image can be displayed
      plantwithRetrievedImageField.retrievedImage = 'data:image/jpeg;base64,' + plant.picByte;
      plantwithRetrievedImageField.description = plant.description;
      plantwithRetrievedImageField.price = plant.price;
      plantwithRetrievedImageField.picByte = plant.picByte;
      this.plants.push(plantwithRetrievedImageField);

      this.searching = false;

    }

    if(this.plantsRecieved.length > 0){
      this.noResults = false;
    }else{
      this.noResults = true;
    }

    this.loading = false;
  }

  /**
   * User router to navigate the shopping cart
   */
  goToCart() {
    this.router.navigate(['/cart']);
  }

  /**
   * Get products/plants appling form filters
   * @param textSearch
   * @param minPrice
   * @param maxPrice
   */
  filters(textSearch, minPrice, maxPrice){

    this.plants = [];
    this.loading = true;

    let search:string  = textSearch.value.trim();
    let min = parseFloat(minPrice.value);
    let max = parseFloat(maxPrice.value);

    if(isNaN(min)){
      min = 0;
    }
    if(isNaN(max)){
      max = 1000000000; //Big number for max price
    }

      this.subscription =  this.httpClientService.getPlantsFilter(search, min, max).subscribe(
        response => {
          this.handleSuccessfulResponse(response)
        }
      );


  }



}


