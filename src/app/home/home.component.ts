import { Component, OnInit, Input } from '@angular/core';
import {Router} from '@angular/router';
import { ApiService } from '../api.service'
import { CookieService } from 'ngx-cookie-service';
import { HttpHeaders,HttpClient } from '@angular/common/http';
import { environment } from '../config'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  status:any;
  selectedpharma: any[] = [];
  startdate:any;
  enddate:any;
  paymentStatus:any;
  constructor(private router:Router,private apiservice:ApiService,private cookieService: CookieService, private httpClient: HttpClient) { }

  ngOnInit(){
    // this.apiservice.getSession();
    this.apiservice.getInvoice();
    this.getpharma();
    
  }

  selectChangeHandler(event: any) {
    //update the ui
    this.selectedpharma = event.target.value;
    console.log("selected:" + JSON.stringify(this.selectedpharma));
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
//    search() {
//     console.log("seleectedPharma:" + this.selectedpharma);
//     console.log("startdate:" + this.startdate);
//     console.log("startdate:" + this.enddate);
//     console.log("status" + this.status);
//     console.log("status:" + this.paymentStatus);
//     let deviceId = sessionStorage.getItem('deviceId');

//     let url = this"/services/invoice/suppliers/pharmacies/invoices/list?offset=0&size=10&sdate=" + this.startdate + "&edate=" + this.enddate + "&status=" + this.status + "&paymentstatus=" + this.paymentStatus + "&null&_="+deviceId;
//     return this.httpClient.get(url).subscribe((data: any) => {
//       let jsonObj =  JSON.parse(data.payload);
//       console.log("jsonObj:" + jsonObj);

//   });
// }
   getInvoiceId(invoicenum){
     this.apiservice.getInvoiceId(invoicenum);
     this.getDetailsid()
   }
   getDetailsid(){
     this.apiservice.getDetailsid();
   }






  

}
