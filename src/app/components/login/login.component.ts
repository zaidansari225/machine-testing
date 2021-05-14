import { Component, OnInit } from '@angular/core';
import  {FormBuilder,FormGroup, Validators,} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
LoginForm:FormGroup;
submitted=false;
  constructor(private fb:FormBuilder,private router:Router, private authService: AuthService,private toastr: ToastrService) {
this.LoginForm=this.fb.group({
  email:['',[Validators.required,Validators.email]],
  password:['',[Validators.required,Validators.minLength(6)]]
})
if (this.authService.isLoggedIn()) {
  this.router.navigateByUrl('/main/dashboard');
}
   }
   get f(){return this.LoginForm.controls;}

  ngOnInit(): void {
  }
submit(){
  this.submitted = true;
  if (this.LoginForm.invalid) {
  return;
  }
  this.authService.login({
    email: this.LoginForm.get('email').value,
    password: this.LoginForm.get('password').value
  }).subscribe(
    result => {
      console.log(result)
      if (result) {

        this.toastr.success("Login Success")
        this.router.navigateByUrl('/main');
      }else{
        this.toastr.error("Login Fail")
      }
    }
  )
}
}
