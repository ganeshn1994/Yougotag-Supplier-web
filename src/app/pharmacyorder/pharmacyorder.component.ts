import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import {MatDatepickerModule} from '@angular/material/datepicker';

@Component({
  selector: 'app-pharmacyorder',
  templateUrl: './pharmacyorder.component.html',
  styleUrls: ['./pharmacyorder.component.css']
})
export class PharmacyorderComponent implements OnInit {

  selectedDay: any = '';
  startdate:any = '';
  enddate:any = '';
  status:any = '';

  
  constructor(private apiservice:ApiService) { }

  ngOnInit() {
    // this.apiservice.pharmacyorder();
    this.getpharma();
  }

  selectChangeHandler(event: any) {
    //update the ui
    this.selectedDay = event.target.value;
    console.log("selected:" + JSON.stringify(this.selectedDay));
  }

  getpharma(){
    this.apiservice.getpharma();
    
  }

  displayPOList(pharmacyid,status,startdate,enddate){
    console.log('startdate' + startdate);
    console.log('enddate' + enddate);
    console.log('status' + status);


  }



}
