import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../../service/http-client.service';
import { Employee } from '../../models/employee';
import { deprecate } from 'util';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})

/**
 * NOT IN USE
 */
export class EmployeeComponent implements OnInit {

  employees:Employee[];

  constructor(
    private httpClientService:HttpClientService
  ) { }

  ngOnInit() {
  }

handleSuccessfulResponse(response)
{
    this.employees=response;
}


}
