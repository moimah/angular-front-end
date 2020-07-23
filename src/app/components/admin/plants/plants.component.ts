import { Component, OnInit } from '@angular/core';
import { Plant } from '../../../models/plant';
import { HttpClientService } from '../../../service/http-client.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-plants',
  templateUrl: './plants.component.html',
  styleUrls: ['./plants.component.css']
})
export class PlantsComponent implements OnInit {

  loading: boolean = true;
  plants: Array<Plant>;
  plantsRecieved: Array<Plant>;
  selectedPlant: Plant;
  action: string;


  //Inject the HttpClientService, activedRoute and router
  constructor(private httpClientService: HttpClientService,
    private activedRoute: ActivatedRoute,
    private router: Router) { }

    ngOnInit() {
      this.refreshData();
    }


    /**
     * Refresh data getting the url param
     * and if exist retrieve the plants to plant array
     */
   refreshData() {
     this.loading = true;
    this.httpClientService.getPlants().subscribe(
      response => this.handleSuccessfulResponse(response)
    );
    this.activedRoute.queryParams.subscribe(
      (params) => {

        this.action = params['action'];
        const id = params['id'];

        if (id) {
          this.selectedPlant = this.plants.find((plant) => {
            return plant.id === +id;
          });
        }
      }
    );
  }


  /**
   * Take the plants reponse returned from databse
   * @param response
   */
  handleSuccessfulResponse(response) {
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
      plantwithRetrievedImageField.picByte=plant.picByte;
      this.plants.push(plantwithRetrievedImageField);
      this.loading = false;
    }
  }

/**
 * Navigate with router to addPlant component
 */
  addPlant() {
    this.selectedPlant = new Plant();
    this.router.navigate(['admin', 'plants'], { queryParams: { action: 'add' } });
  }

  /**
   * Navigate with router to view plant component
   * @param id
   */
  viewPlant(id: number) {
    this.router.navigate(['admin', 'plants'], { queryParams: { id, action: 'view' } });
  }


 }
