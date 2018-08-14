import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';
import { CookieService } from 'ngx-cookie-service';
import {Router} from '@angular/router';
import { ApiService } from '../api.service'
import { environment } from '../../app/config'
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-purchaseinvoice',
  templateUrl: './purchaseinvoice.component.html',
  styleUrls: ['./purchaseinvoice.component.css']
})
export class PurchaseinvoiceComponent implements OnInit {

  serviceUrl = environment.serviceUrl;
  datePickerConfig: Partial<BsDatepickerConfig>;
  minDateConfig: Partial<BsDatepickerConfig>;
  invoiceForm: FormGroup;
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
  text:any;
  expiry:any='';
  enddate:any='';
  gsttype: any;
  cgst: any;
  sgst: any;
  cacfname: any;
  suppliedwhen: any;
  schedule: any;
  ponum: any;
  suppliedqty: any;
  mrp: any;
  stockdisc: any;
  rack: any;
  shelf: any;
  selectedcacfid: any;



 
  constructor(private httpClient:HttpClient,private router:Router,private apiservice:ApiService,private cookieService: CookieService) { 
    this.datePickerConfig = Object.assign({},{containerClass:'theme-dark-blue',showWeekNumbers:false,dateInputFormat:'YYYY/MM/DD'});
    this.minDateConfig = Object.assign({},{containerClass:'theme-dark-blue',showWeekNumbers:false,dateInputFormat:'YYYY/MM/DD',minDate:new Date()});
    this.apiservice.getDefaultDate();
  }

  ngOnInit() {
  }
  
  onSubmit(){
  console.log("suppliedquality:"+ this.suppliedqty);
  }
  searchcacf(event){
    if(this.text.length>0){
    this.apiservice.searchcacf(event);

    }
  }
  HEAD
  
  selectcacf(selectedcacf,selectcacfname){
    this.apiservice.selectcacfinward(selectedcacf,selectcacfname);
    this.selectedcacfid =this.apiservice.selectcacf
  }

  saveDrug(){
    let supplierStocksBO=
    {
      "supplierStocksBO": [{
        caCfId: this.selectedcacfid,
        caCfName: "EGANGAA",
        tradeCompositeId: this.drugname,
        batchNumber: this.batchno,
        suppliedWhen: this.suppliedwhen,
        taxOnWhat: this.taxmodal,
        manufacturerMnemonic: this.manufacturerMnemonic,
        batchStatus: "N",
        expiryDate: this.expiry,
        schedule: this.schedule,
        poNumber: this.ponum,
        baseUnitPackingQuantity: this.packingqty,
        stockUnitPackingQuantityPerBase: 1,
        baseUnitSalesPrice: 1.3,
        priceToStockist: this.pricetostockist,
        stockUnitSalesPrice: this.stocksalesrate,
        baseUnitMaximumRetailPrice: 2,
        stockUnitMaximumRetailPrice: this.stockmrp,
        baseUnitDiscountPercentage: 0.00,
        stockUnitDiscountPercentage:this.dispercent,
        baseUnitSchemeDiscountPercentage: 0.00,
        stockUnitSchemeDiscountPercentage: 0.00,
        stockUnitSchemeDiscountAmount: this.stockscheme,
        quantitySuppliedInBaseUnit: 21000,
        quantitySoldInBaseUnit: 0,
        quantityReturnedInBaseUnit: 0,
        quantityAvailable: 21000,
        cgstPercentage: this.cgstpercent,
        gsttype: this.gsttype,
        sgstPercentage: this.addlgstpercent,
        hsnCode: "" ,
        rackReference: this.rack ,
        shelfReference: this.shelf,
        ledgerType: "S"
        
      }]
    }

    console.log("supplierStocksBO:" + JSON.stringify(supplierStocksBO));
    let url = this.serviceUrl + '/suppliers/stocks';
    return this.httpClient.post(url,supplierStocksBO).subscribe((data:any)=>{
      let jsonObj = JSON.parse(data);
      console.log('jsonObj:' + JSON.stringify(jsonObj));
    })
  }
}
