import { Component, OnInit, Input } from '@angular/core';
import {Router} from '@angular/router';
import { ApiService } from '../api.service'
import { CookieService } from 'ngx-cookie-service';
import { HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  

  selectedDay: any = '';
  startdate:any;
  enddate:any;
  constructor(private router:Router,private apiservice:ApiService,private cookieService: CookieService) { }

  ngOnInit(){
    // this.apiservice.getSession();
    this.apiservice.getInvoice();
    
  }

  selectChangeHandler(event: any) {
    //update the ui
    this.selectedDay = event.target.value;
    console.log("selected:" + JSON.stringify(this.selectedDay));
  }

  startdates(event: any) {
    //update the ui
    this.startdate = event.target.value;
    console.log("selected:" + JSON.stringify(this.startdate));
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
   search(){
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
