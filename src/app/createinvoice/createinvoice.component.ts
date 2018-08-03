import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service'

@Component({
  selector: 'app-createinvoice',
  templateUrl: './createinvoice.component.html',
  styleUrls: ['./createinvoice.component.css']
})
export class CreateinvoiceComponent implements OnInit {

  constructor(private apiservice:ApiService) { }

  ngOnInit() {
    this.getpharma();
  }

  getpharma(){
    this.apiservice.getpharma();
    
  }
}
