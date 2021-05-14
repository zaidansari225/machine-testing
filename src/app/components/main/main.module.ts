import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
  
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { HeaderComponent } from '../header/header.component';
import {FooterComponent} from '../footer/footer.component';
import {AddProductComponent} from '../add-product/add-product.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {CartComponent} from '../cart/cart.component';
import {DashboardComponent} from '../dashboard/dashboard.component';
import { ToastrModule} from 'ngx-toastr';

@NgModule({
  declarations: [MainComponent,HeaderComponent,FooterComponent,AddProductComponent,CartComponent,DashboardComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      easeTime:"300"
    }),
  ], 
  schemas:[CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
})
export class MainModule { }
