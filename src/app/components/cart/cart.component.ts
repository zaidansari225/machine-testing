import { Component, OnInit,AfterViewInit } from '@angular/core';
import {CommonService} from '../../services/common.service';
import {ToastrService} from 'ngx-toastr';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit,AfterViewInit {
Cart;
TotalPrice=0;
user=localStorage.getItem('currentUser')
  orginalPrice: any;
  constructor(private authService:CommonService,private toastr:ToastrService) {
    
   }

  ngOnInit(): void {
    this.authService.fetchCartByUserId({user_id:JSON.parse(this.user).id}).subscribe(res => {
      console.log(res)

      if(res['success']==true){
        this.Cart=res['data'];
      for(let  i=0;i<this.Cart.length;i++){
       this.TotalPrice=this.TotalPrice+this.Cart[i].price
       this.orginalPrice=this.TotalPrice+this.Cart[i].price
      } 
      }
      console.log(this.Cart)
    })
   
  }
delete(id){
  this.authService.deleteCart({id:id}).subscribe(res => {
    if(res['success']==true){
  this.toastr.success(res['message']);
  setTimeout(() => {
window.location.reload();
  },500)
    }else{
      this.toastr.error(res['message'])
    }
  })
}
increaseValue() {
  var value = parseInt((<HTMLInputElement>document.getElementById('number')).value, 10);
  value = isNaN(value) ? 0 : value;
  value++;
  (<HTMLInputElement>document.getElementById('number')).value = value.toString();
}
decreaseValue() {
  var value = parseInt((<HTMLInputElement>document.getElementById('number')).value , 10);
  value = isNaN(value) ? 0 : value;
  value < 1 ? value = 1 : '';
  value--;
  (<HTMLInputElement>document.getElementById('number')).value = value.toString();
}
total(value){
this.TotalPrice=this.TotalPrice*value;

console.log(this.TotalPrice)
}
less(value){
  this.TotalPrice=this.TotalPrice-this.orginalPrice*value
}
ngAfterViewInit(){
 
  
  
}
}
