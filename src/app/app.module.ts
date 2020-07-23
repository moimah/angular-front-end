import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { UsersComponent } from './components/admin/users/users.component';

//Add FormsModule
import {FormsModule} from '@angular/forms';

// Add HTTPClientModule
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AdduserComponent } from './components/admin/users/adduser/adduser.component';
import { ViewuserComponent } from './components/admin/users/viewuser/viewuser.component';
import { PlantsComponent } from './components/admin/plants/plants.component';
import { AddplantComponent } from './components/admin/plants/addplant/addplant.component';
import { ViewplantComponent } from './components/admin/plants/viewplant/viewplant.component';
import { ShopComponent } from './components/shop/shop.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { FooterComponent } from './components/footer/footer.component';
import { BasicAuthHtppInterceptorService } from './service/basic-auth-htpp-interceptor-service';
import { CartComponent } from './components/cart/cart.component';
import { LoaderComponent } from './components/loader/loader.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrdersComponent } from './components/orders/orders.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    UsersComponent,
    AdduserComponent,
    ViewuserComponent,
    PlantsComponent,
    AddplantComponent,
    ViewplantComponent,
    ShopComponent,
    LoginComponent,
    LogoutComponent,
    EmployeeComponent,
    AddEmployeeComponent,
    FooterComponent,
    CartComponent,
    LoaderComponent,
    CheckoutComponent,
    OrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS, useClass:BasicAuthHtppInterceptorService, multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
