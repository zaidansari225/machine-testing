import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {CommonService} from '../../services/common.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
user=localStorage.getItem('currentUser');
Cart=[]
  constructor(private authService:AuthService,private router:Router,private commonService:CommonService) { }

  ngOnInit(): void {
    this.commonService.fetchCartByUserId({user_id:JSON.parse(this.user).id}).subscribe(res => {
      console.log(res)

      if(res['success']==true){
        this.Cart=res['data'];
     
      }
      console.log(this.Cart)
    })
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
