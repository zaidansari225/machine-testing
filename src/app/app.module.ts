import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, Directive, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { ToastrModule} from 'ngx-toastr';
import {HttpClientModule} from '@angular/common/http';
import { httpInterceptorProviders } from './http-interceptors';
import { HttpErrorHandler } from './services/http-error-handler.service';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
 
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    HttpClientModule
  ],
 schemas:[CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],
  providers: [ HttpErrorHandler,
    httpInterceptorProviders],
    bootstrap: [AppComponent],
}) 
export class AppModule { }
