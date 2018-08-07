import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { pipeDef } from '../../../node_modules/@angular/core/src/view';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';
import {Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-pharmacyorder',
  templateUrl: './pharmacyorder.component.html',
  styleUrls: ['./pharmacyorder.component.css']
})
export class PharmacyorderComponent implements OnInit {

  datePickerConfig: Partial<BsDatepickerConfig>;
  selectedDay: any = '';
  startdate:any ;
  enddate:any ;
  paymentStatus =' ';
  Status =' ';

  
  constructor(private router:Router,private apiservice:ApiService,private cookieService: CookieService) { 
    this.datePickerConfig = Object.assign({},{containerClass:'theme-dark-blue',showWeekNumbers:false,dateInputFormat:'YYYY/MM/DD'});
    var date = new Date();
    this.startdate = date.getFullYear()  + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('01');
    this.enddate = date.getFullYear()  + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2) ;

  }

  ngOnInit() {
    // this.apiservice.pharmacyorder();
    this.getpharma();
    this.getpoorder();
  }

  selectChangeHandler(event: any) {
    //update the ui
    this.selectedDay = event.target.value;
    console.log("selected:" + this.selectedDay);
  }

  getpharma(){
    this.apiservice.getpharma();
    
  }

  getpoorder(){
    this.apiservice.pharmacyorder();
  }

  viewInvoice(pid,pnum){
    this.apiservice.pobyId(pid,pnum);
    this.apiservice.displaypobyId();
  }

  generatePo(){
    this.apiservice.generatePo();
  }

  displayPOList(pharmacyid,status,startdate,enddate){
    console.log('startdate' + startdate);
    console.log('enddate' + enddate);
    console.log('status' + status);
  }



}
