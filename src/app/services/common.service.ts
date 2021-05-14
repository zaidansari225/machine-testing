import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CommonService {
private apiUrl=environment.apiUrl
  constructor(private http:HttpClient) { }
  addProduct(data){
    return this.http.post(this.apiUrl+'product/add-product',data);
  }
  getAllProduct(){
    return this.http.get(this.apiUrl+'product/fetch-product');
  }
  deleteProduct(id){
    return this.http.post(this.apiUrl+'product/delete-product',id);
  }
updateProduct(data){
  return this.http.post(this.apiUrl+'product/update-product',data);
}
getProductById(id){
  return this.http.post(this.apiUrl+'product/fetch-productById',id);
}
addCart(data){
  return this.http.post(this.apiUrl+'cart/add-cart',data);

}
getCart(){
  return this.http.get(this.apiUrl+'cart/fetch-cart');
}
deleteCart(id){
  return this.http.post(this.apiUrl+'cart/delete-cart',id);
}
updateCart(data){
  return this.http.post(this.apiUrl+'cart/update-cart',data);

}
fetchCartByUserId(id){
  return this.http.post(this.apiUrl+"cart/fetch-cartById",id);
}
}
