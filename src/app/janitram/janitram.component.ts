import { Component, OnInit } from '@angular/core';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';
import {Router} from '@angular/router';
import { ApiService } from '../api.service'
import { CookieService } from 'ngx-cookie-service';
import { HttpHeaders,HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-janitram',
  templateUrl: './janitram.component.html',
  styleUrls: ['./janitram.component.css']
})
export class JanitramComponent implements OnInit {
  datePickerConfig: Partial<BsDatepickerConfig>;
  constructor(private router:Router,private httpClient:HttpClient,private apiservice:ApiService,private cookieService: CookieService) { 
    this.datePickerConfig = Object.assign({},{containerClass:'theme-dark-blue',showWeekNumbers:false,dateInputFormat:'YYYY/MM/DD'});
    this.apiservice.getDefaultDate();

  }

  ngOnInit() {
  }

}
