import { Component, OnInit } from '@angular/core';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';
import {Router} from '@angular/router';
import { ApiService } from '../api.service'
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-janitram',
  templateUrl: './janitram.component.html',
  styleUrls: ['./janitram.component.css']
})
export class JanitramComponent implements OnInit {

  datePickerConfig: Partial<BsDatepickerConfig>;
  gststartdate:any;
  gstenddate:any;

  constructor(private router:Router,private apiservice:ApiService,private cookieService: CookieService) { 
    this.datePickerConfig = Object.assign({},{containerClass:'theme-dark-blue',showWeekNumbers:false,dateInputFormat:'YYYY/MM/DD'});
    var date = new Date();
    this.gststartdate = date.getFullYear()  + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('01');
    this.gstenddate = date.getFullYear()  + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2) ;

  }

  ngOnInit() {
  }

}
