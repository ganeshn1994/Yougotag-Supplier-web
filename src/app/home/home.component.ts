import { Component, OnInit, Input } from '@angular/core';
import {Router} from '@angular/router';
import { ApiService } from '../api.service'
import { CookieService } from 'ngx-cookie-service';
import { HttpHeaders,HttpClient } from '@angular/common/http';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';
import {PaginatorModule} from 'primeng/paginator';
import { environment } from '../config';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
 

  baseUrl = environment.baseUrl;
  serviceUrl = environment.serviceUrl;
  
  constructor(private router:Router,private httpClient:HttpClient,private apiservice:ApiService,private cookieService: CookieService) { 
    this.apiservice.getDefaultDate();

  }
  ngOnInit(){
    // this.apiservice.getSession();
    this.getpharma();
    this.apiservice.getInvoice();
    
  }

  selectChangeHandler(event: any) {
    //update the ui
 this.apiservice.selectChangeHandler(event);
  }

  selectStatus(event: any) {
    this.apiservice.selectStatus(event);
  }
  selectpaymentStatus(event: any) {
    this.apiservice.selectpaymentStatus(event);
  }
  listdata(){
    
    let deviceId = localStorage.getItem('deviceId');
    console.log("deviceId:" + deviceId)
    this.apiservice.getdetails();
  }
   getpharma(){
     this.apiservice.getpharma();
     
   }

   getInvoice(){
     this.apiservice.getInvoice();
   }
    search() {
  this.apiservice.search();
}
   getInvoiceId(invoicenum){
     this.apiservice.getInvoiceId(invoicenum);
     this.getDetailsid()
   }
   getDetailsid(){
     this.apiservice.getDetailsid();
   }






  

}
