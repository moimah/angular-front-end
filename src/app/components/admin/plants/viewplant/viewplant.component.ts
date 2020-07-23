import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Plant } from '../../../../models/plant';
import { HttpClientService } from '../../../../service/http-client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewplant',
  templateUrl: './viewplant.component.html',
  styleUrls: ['./viewplant.component.css']
})
export class ViewplantComponent implements OnInit {

  @Input()
  plant: Plant;
  @Output()
  plantDeletedEvent = new EventEmitter();

  constructor(private httpClientService: HttpClientService, private router: Router
    ) { }

  ngOnInit(): void {
  }

  deletePlant() {
    let  del = confirm("Delete plant " + this.plant.name + "?");
    if (del == true) {
      this.httpClientService.deletePlant(this.plant.id).subscribe(
        (plant) => {
          this.plantDeletedEvent.emit();
          this.router.navigate(['admin', 'plants']);
        }
      );
    }

  }


  editPlant() {
    this.router.navigate(['admin', 'plants'], { queryParams: { action: 'edit', id: this.plant.id } });
  }

}
