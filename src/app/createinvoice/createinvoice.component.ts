import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import {AutoCompleteModule} from 'primeng/autocomplete';

@Component({
  selector: 'app-createinvoice',
  templateUrl: './createinvoice.component.html',
  styleUrls: ['./createinvoice.component.css']
})
export class CreateinvoiceComponent implements OnInit {

  textlen: any;
  country: any;
    
  countries: any[];
      
  filteredCountriesSingle: any[];
  
  filteredCountriesMultiple: any[];
  
  filteredBrands: any[];
  
  brand: string;
  text: any;
  x:any;
  constructor(private apiservice:ApiService) { }

  ngOnInit() {
    this.getpharma();
  }

 

  getpharma(){
    this.apiservice.getpharma();
    
  }
  search(event){
    if(this.text.length>0){
    this.apiservice.searchcreate(event);
    }
  }

  createInvoice(selecteddrug){
    this.apiservice.createInvoice(selecteddrug);
  }

  handleDropdown(event) {
    // event.query = current value in input field
}

}
