import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ApiService } from '../api.service';
import { CookieService } from 'ngx-cookie-service';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  datePickerConfig: Partial<BsDatepickerConfig>;
  startDateInCompanyReport:any='';
  endDateInCompanyReport:any='';

  constructor(private router:Router,private apiservice:ApiService,private cookieService: CookieService) { 
    this.datePickerConfig = Object.assign({},{containerClass:'theme-dark-blue',showWeekNumbers:false,dateInputFormat:'YYYY/MM/DD'});
  }

  ngOnInit() {
  }


//pharmacyorder
pharmacyorder_show(){
  this.router.navigate(['pharmacyorder'])
}


  logout(){
    localStorage.removeItem('deviceId');
    this.apiservice.logout();
  }
  

}
