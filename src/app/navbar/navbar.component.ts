import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ApiService } from '../api.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router:Router, private apiservice:ApiService) { }

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
