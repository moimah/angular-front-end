import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './components/admin/users/users.component';
import { PlantsComponent } from './components/admin/plants/plants.component';
import { ShopComponent } from './components/shop/shop.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { AuthGuardService } from './service/auth-guard.service';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';

import { EmployeeComponent } from './components/employee/employee.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrdersComponent } from './components/orders/orders.component';



const routes: Routes = [
  // { path:'employees', component: EmployeeComponent},
  { path:'adduser', component: AddEmployeeComponent},
  { path: 'admin/users', component: UsersComponent, canActivate:[AuthGuardService] },
  { path: 'admin/plants', component: PlantsComponent, canActivate:[AuthGuardService] },
  { path: 'shop', component: ShopComponent, canActivate:[AuthGuardService] },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent, canActivate:[AuthGuardService] },
  { path: 'checkout', component: CheckoutComponent, canActivate:[AuthGuardService] },
  { path: 'orders', component: OrdersComponent, canActivate:[AuthGuardService] },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
