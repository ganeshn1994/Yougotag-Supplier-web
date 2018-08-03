import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-purchaseinvoice',
  templateUrl: './purchaseinvoice.component.html',
  styleUrls: ['./purchaseinvoice.component.css']
})
export class PurchaseinvoiceComponent implements OnInit {

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



 
  constructor() { }

  ngOnInit() {
    

  }
  onSubmit(){
  console.log("suppliedquality:"+ this.suppliedqty);
  }
}
