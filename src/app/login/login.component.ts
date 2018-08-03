import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ApiService } from '../api.service'
import { CookieService } from 'ngx-cookie-service';
import { HttpHeaders } from '../../../node_modules/@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  cookieValue = 'UNKNOWN';
  headers:HttpHeaders;
  loginData = {
    deviceId : Date.now()
    
    
  }
  display='none';
  constructor(private router:Router, private apiservice:ApiService, private cookieService: CookieService) {
   

  
   }

  ngOnInit() {
    
  }
  loginPost(){
    let deviceId:any = this.loginData.deviceId;
    sessionStorage.setItem('deviceId',deviceId)
    this.apiservice.login(this.loginData);
   

    setTimeout(() => {
      this.getDetails();
    }, 11000);
   
    // this.router.navigate(['home'])
  }
  openModal(){


    this.display='block'; 


 }

  getDetails(){
    this.apiservice.getdetails();
  }
  getTenantId(){
    this.apiservice.getTenantId();
  }
  getInvoice(){
    this.apiservice.getInvoice();
  }

}
