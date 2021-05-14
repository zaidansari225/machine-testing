import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder, Validators} from '@angular/forms';
import {CommonService} from '../../services/common.service';
import {ToastrService} from 'ngx-toastr';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
ProductForm:FormGroup;
submitted=false
  constructor(private fb:FormBuilder,private authService:CommonService,private toastr:ToastrService) { 
    this.ProductForm=this.fb.group({
      name:['',[Validators.required]],
      price:['',[Validators.required]],
      desc:['',[Validators.required]]
    })
  }
get f(){return this.ProductForm.controls;}
  ngOnInit(): void {
  }
submit(){
  this.submitted=true
  if(this.ProductForm.invalid){
    return;
}
let user=localStorage.getItem('currentUser');
console.log(JSON.parse(user).id)
let data=this.ProductForm.value;
data.user_id=JSON.parse(user).id
console.log(data)
this.authService.addProduct(data).subscribe(res => {
  if(res['success']==true){
    this.toastr.success("add Product Sucessfully");
  }else{
    this.toastr.error(res['message']);
  }
})
console.log(this.ProductForm.value);
}
}
