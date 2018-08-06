import { Component, OnInit, Input } from '@angular/core';
import {Router} from '@angular/router';
import { ApiService } from '../api.service'
import { CookieService } from 'ngx-cookie-service';
import { HttpHeaders } from '@angular/common/http';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';
import {PaginatorModule} from 'primeng/paginator';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  datePickerConfig: Partial<BsDatepickerConfig>;
  selectedDay: any = '';
  startdate:any;
  enddate:any;
  
  constructor(private router:Router,private apiservice:ApiService,private cookieService: CookieService) { 
    this.datePickerConfig = Object.assign({},{containerClass:'theme-dark-blue',showWeekNumbers:false,dateInputFormat:'YYYY/MM/DD'});
    var date = new Date();
    this.startdate = date.getFullYear()  + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('01');
    this.enddate = date.getFullYear()  + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2) ;

  }
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
  //  search(){
  //    this.apiservice.search();
  //  }
   getInvoiceId(invoicenum){
     this.apiservice.getInvoiceId(invoicenum);
     this.getDetailsid()
   }
   getDetailsid(){
     this.apiservice.getDetailsid();
   }






  

}