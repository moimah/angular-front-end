import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { UserStatus } from '../models/user-status';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor( private httpClient:HttpClient) { }
  /**
   * Make query to databse, to get token and user info to storage in sessionStorage
   * @param username
   * @param password
   */
  authenticate(username, password) {
    return this.httpClient.post<any>('http://localhost:8080/authenticate',{username,password}).pipe(
     map(
       userData => {
        sessionStorage.setItem('username',username);
        let tokenStr= 'Bearer '+userData.token;
        sessionStorage.setItem('token', tokenStr);
        return userData;
       }
     )

    );
  }

  /**
   * Check if user is LoggedInt getting session storage
   */
  isUserLoggedIn() {
    let user = sessionStorage.getItem('username');
    console.log(!(user === null));
    return !(user === null);
  }

  /**
   * Logout the user and remove info from session storage
   */
  logOut() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('type');
  }

  /**
   * Check if user is admin
   */
  isUserAdmin(): boolean{

    let userType= sessionStorage.getItem('type');
    //If is user can be admin or custoer
    if(userType != null){
      if(userType == 'administrator'){
        return true;
      }else{
        return false;
      }
    }

  }



}
