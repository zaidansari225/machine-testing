import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
SignupForm:FormGroup;
submitted=false;
  constructor(private fb:FormBuilder,private authService:AuthService,private toastr:ToastrService,private router:Router) {
    this.SignupForm=this.fb.group({
      name:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(6)]]
    })
   }
get f(){return this.SignupForm.controls}
  ngOnInit(): void {
  }
submit(){
  this.submitted = true;
  if (this.SignupForm.invalid) {
  return;
  }
this.authService.signup(this.SignupForm.value).subscribe(res => {
if(res['success']){
  this.toastr.success("User add sucessfuly")
  this.router.navigate(["/"])
}else{
  this.toastr.error("Fail to add user")
  this.SignupForm.reset();
}
});
}
}
