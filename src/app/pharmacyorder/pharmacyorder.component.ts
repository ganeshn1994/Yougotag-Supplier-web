import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { pipeDef } from '../../../node_modules/@angular/core/src/view';
import {Router} from '@angular/router';
import { HttpHeaders,HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pharmacyorder',
  templateUrl: './pharmacyorder.component.html',
  styleUrls: ['./pharmacyorder.component.css']
})
export class PharmacyorderComponent implements OnInit {

  selectedDay: any = [];
  status:any = '';

  
  constructor(private router:Router,private httpClient:HttpClient,private apiservice:ApiService) { 
    this.apiservice.getDefaultDate();

  }

  ngOnInit() {
    // this.apiservice.pharmacyorder();
    this.getpharma();
    this.getpoorder();
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

  displayPOList(){
    this.apiservice.searchPOList();
  }



}
