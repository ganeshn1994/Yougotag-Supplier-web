import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';
import { CookieService } from 'ngx-cookie-service';
import {Router} from '@angular/router';
import { ApiService } from '../api.service'


@Component({
  selector: 'app-purchaseinvoice',
  templateUrl: './purchaseinvoice.component.html',
  styleUrls: ['./purchaseinvoice.component.css']
})
export class PurchaseinvoiceComponent implements OnInit {

  datePickerConfig: Partial<BsDatepickerConfig>;
  invoiceForm: FormGroup;
  suppliedqty:any='';
  freeqty:any='';
  packingqty:any='';
  invoicenumber:any='';
  drugname:any='';
  invoicedate:any='';
  cacfid:any='';
  batchno:any='';
  pricetostockist:any='';
  stocksalesrate:any='';
  stockmrp:any='';
  dispercent:any='';
  stockscheme:any='';
  cgstpercent:any='';
  addlgstpercent:any='';
  taxmodal:any='';
  manufacturerMnemonic:any='';



 
  constructor(private router:Router,private apiservice:ApiService,private cookieService: CookieService) { 
    this.datePickerConfig = Object.assign({},{containerClass:'theme-dark-blue',showWeekNumbers:false,dateInputFormat:'YYYY/MM/DD'});
  }

  ngOnInit() {
    

  }
  onSubmit(){
  console.log("suppliedquality:"+ this.suppliedqty);
  }
}
