import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from './main.component';
import  {DashboardComponent} from '../dashboard/dashboard.component';
import {AddProductComponent} from '../add-product/add-product.component'
import {CartComponent} from '../cart/cart.component';
import {AuthGuard} from '../../auth/auth.guard'

const routes: Routes = [{
  path:'',
  component:MainComponent,
  children:[{
    path:'',
    component:DashboardComponent,
    canLoad:[AuthGuard]
  },{
    path:'add-product',
    component:AddProductComponent,
    canLoad:[AuthGuard]
  },{
    path:'cart',
    component:CartComponent,
    canLoad:[AuthGuard]
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
