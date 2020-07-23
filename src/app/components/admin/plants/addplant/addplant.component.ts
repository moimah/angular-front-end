import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Plant } from '../../../../models/plant';
import { HttpClientService } from '../../../../service/http-client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-addplant',
  templateUrl: './addplant.component.html',
  styleUrls: ['./addplant.component.css']
})
export class AddplantComponent implements OnInit {


  @Input()
  plant: Plant;

  @Output()
  plantAddedEvent = new EventEmitter();

  public selectedFile;
  imgURL: any;

  constructor(private httpClientService: HttpClientService,
    private activedRoute: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  /**
   * Detect changes in file image
   * @param event
   */
  public onFileChanged(event) {
    console.log(event);
    this.selectedFile = event.target.files[0];

    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event2) => {
      this.imgURL = reader.result;
    };

  }


  savePlant() {



     //If there is no plant id then it is an add plant call else it is an edit plant call
     if (this.plant.id == null) {
      const uploadData = new FormData();
      uploadData.append('imageFile', this.selectedFile, this.selectedFile.name);
      this.selectedFile.imageName = this.selectedFile.name;

      this.httpClient.post('http://localhost:8080/plants/upload', uploadData, { observe: 'response' })
        .subscribe((response) => {
          if (response.status === 200) {
            this.httpClientService.addPlant(this.plant).subscribe(
              (plant) => {
                this.plantAddedEvent.emit();
                this.router.navigate(['admin', 'plants']);
              }
            );
            console.log('Image uploaded successfully');
          } else {
            console.log('Image not uploaded successfully');
          }
        }
        );
     }else{
      this.httpClientService.updatePlant(this.plant).subscribe(
        (plant) => {
          this.plantAddedEvent.emit();
          this.router.navigate(['admin', 'plants']);
        }
      );
     }


  }


}
