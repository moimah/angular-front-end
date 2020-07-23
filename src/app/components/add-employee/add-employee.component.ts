import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/employee';
import { HttpClientService } from '../../service/http-client.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: "app-add-employee",
  templateUrl: "./add-employee.component.html",
  styleUrls: ["./add-employee.component.css"],
})
export class AddEmployeeComponent implements OnInit {
  user: User = new User();
  repeatPassword = "";
  allUsers: User[] = [];

  constructor(
    private httpClientService: HttpClientService,
    private router: Router
  ) {}

  ngOnInit() {}

  /**
   * Create a new user calling the service
   * Send a mesage to info if login or error
   */
  createUser(): void {
    if (this.user.password == this.repeatPassword) {
      this.httpClientService.createUser(this.user).subscribe((data) => {
        alert("User created successfully.");
        this.router.navigate(["login"]);
      });
    } else {
      alert("Password dont match.");
    }
  }
}



