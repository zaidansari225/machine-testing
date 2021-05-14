import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddProductComponent } from './components/add-product/add-product.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {LoginComponent} from './components/login/login.component';
import {SignupComponent} from './components/signup/signup.component';
import {AuthGuard} from './auth/auth.guard'
const routes: Routes = [{
  path:'',
  component:LoginComponent
},{
  path:'signup',
  component:SignupComponent
},{
  path:'add-product',
  component:AddProductComponent,
  canLoad:[AuthGuard]
},{
path:'dashboard',
component:DashboardComponent,
canLoad:[AuthGuard]
},
{
  path:'main',
  loadChildren :() => import('./components/main/main.module').then(m => m.MainModule),
  canLoad:[AuthGuard]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
