import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder, Form} from '@angular/forms';
import {Router} from '@angular/router';
import {CommonService} from '../../services/common.service';
import {ToastrService} from 'ngx-toastr';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
updateProduct:FormGroup;
submitted=false;

Product=[]
  constructor(private fb:FormBuilder,private router:Router,private authSerivce:CommonService,private toastr:ToastrService) {
    this.updateProduct=this.fb.group({
      name:[''],
      price:[''],
      desc:[''],
      id:['']
    })
   }

  ngOnInit(): void {
    this.authSerivce.getAllProduct().subscribe(res => {
      if(res['success']){
        let arr=res['data']  
        let user=localStorage.getItem('currentUser');
        for(let i=0;i<arr.length;i++){
            if(arr[i].user_id==JSON.parse(user).id){
              this.Product.push({disable:false,arr:arr[i]})
            }else{
             this.Product.push({disable:true,arr:arr[i]})
            }
           
        }
        console.log(this.Product)
      }
    })
  }
  get f(){return this.updateProduct.controls;}
edit(id){
this.authSerivce.getProductById({id:id}).subscribe(res => {
  if(res['success']==true){
    let data=res['data'][0]
    this.f.name.setValue(data['name'])
    this.f.price.setValue(data['price'])
    this.f.desc.setValue(data['description'])
    this.f.id.setValue(data['id'])
    console.log(res)
  }
})
}
delete(id){
  this.authSerivce.deleteProduct({id:id}).subscribe(res => {
if(res['success']==true){
  this.toastr.success(res['message'])
 setTimeout(()=>{
  window.location.reload();
 },1000) 
}else{
  this.toastr.error(res['message']) 
}
  });
}
  addToCart(id){
    this.authSerivce.getProductById({id:id}).subscribe(res => {
console.log(res['data'][0])
this.authSerivce.addCart(res['data'][0]).subscribe(data => {
  console.log(data)
if(data['success']==true){
this.toastr.success(data['message'])
this.router.navigate(["/main/cart"]).then(window.location.reload)
}else{
  this.toastr.error(data['message'])
}
}); 
    });
  }
submit(){
 this.submitted=true
console.log(this.updateProduct.value)
 this.authSerivce.updateProduct(this.updateProduct.value).subscribe(res => {
   console.log(res)
   if(res['success']==true){
    setTimeout(() => {
      window.location.reload();
    },1000) 
    this.toastr.success(res['message'])

   }else{
     this.toastr.error(res['message'])
   }
 }) 
} 
}
