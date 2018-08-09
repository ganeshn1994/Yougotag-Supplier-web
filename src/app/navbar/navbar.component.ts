import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ApiService } from '../api.service';
import { CookieService } from 'ngx-cookie-service';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';
import { HttpHeaders,HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router:Router,private httpClient:HttpClient,private apiservice:ApiService,private cookieService: CookieService) { 
    this.apiservice.getDefaultDate();

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
