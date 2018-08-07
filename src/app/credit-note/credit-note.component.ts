import { Component, OnInit } from '@angular/core';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';
import {Router} from '@angular/router';
import { ApiService } from '../api.service'
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-credit-note',
  templateUrl: './credit-note.component.html',
  styleUrls: ['./credit-note.component.css']
})
export class CreditNoteComponent implements OnInit {

  datePickerConfig: Partial<BsDatepickerConfig>;
  startdate:any;
  enddate:any;
  
  constructor(private router:Router,private apiservice:ApiService,private cookieService: CookieService) { 
    this.datePickerConfig = Object.assign({},{containerClass:'theme-dark-blue',showWeekNumbers:false,dateInputFormat:'YYYY/MM/DD'});
  }

  ngOnInit() {
  }

}
