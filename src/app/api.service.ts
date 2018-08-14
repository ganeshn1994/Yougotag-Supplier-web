import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpEvent, HttpEventType, HttpParams } from '@angular/common/http'
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router'
import { reject } from 'q';
import { environment } from '../app/config'
import { RequestOptions, BaseRequestOptions, RequestOptionsArgs } from '@angular/http';
import { InputTextModule } from 'primeng/inputtext';
import { parse } from 'url';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';
import { FloatLabelType } from '../../node_modules/@angular/material';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';





@Injectable({
  providedIn: 'root'
})
export class ApiService {


  url: string;
  token: string;
  data: any = [];
  payload: any;
  startdate: any;
  enddate: any;
  status: any;
  paymentStatus: any;
  supplierid:any;
  pharmaname = [];
  invoicelist = [];
  schemelist = [];
  invoicenum = [];
  tenantList = [];
  tenantid: any = [];
  tenantname = [];
  loginid: any;
  authToken: any;
  saledetails: any = [];
  pharmacyname: any;
  ponumber= [];
  invnum: any;
  totalunitamt: any;
  totalgstamt: any;
  gsttype: any;
  polist:any = [];
  selectedpharma:any;
  pid = [];
  pnum = [];
  pname:any;
  poDate:any;
  poNumber:any;
  polistbyId = [];
  tci:any;
  qo:any;
  datePickerConfig: Partial<BsDatepickerConfig>;
  poinvoice=[];
  text: string;
  results:any=[];
  selecteddrug:any;
  supplierStocks: any = [];
  respArray:any =[];
  igstArray:any = [];
  gstamtArray:any = [];
  quantity:any;

  loginData = {
    deviceId: Date.now()
  }
 


  baseUrl = environment.baseUrl;
  serviceUrl = environment.serviceUrl;
  batch: any;
  exp: any;
  pharmaid: any;
  selectedbatch: any;
  sgstpercent: number;
  cgstpercent: number;
  igstpercent: number;
  selectcacf: any;
  cacf: any =[];
  totalamtArray: any= [];
  gstperArray:any = [];
  salerates: any;
  totalamt: any;
  gstamt: { taxOnWhat: any; MRP: any; salerate: any; totalquan: any; schemedisc: any; };
  sgst: { sgstPercentage: any; cgstPercentage: any; };
  igst: { cgstPercentage: any; igstPercentage: any; };
  gstMRP: any;
  gstper: any;
  drugname: any;
  batchno: any;
  taxmodal: any;
  cacfname: any;

  


  constructor(private httpClient: HttpClient, public router: Router) {}

  getDefaultDate(){
    var date = new Date();
    this.startdate = date.getFullYear()  + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('01');
    this.enddate = date.getFullYear()  + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2); 
  }

  public getToken(): string {
    return localStorage.getItem('authToken');
  }

  selectChangeHandler(event: any) {
    //update the ui
    this.selectedpharma = event;
    console.log("selected:" + JSON.stringify(this.selectedpharma));
  }
  selectStatus(event: any) {
    //update the ui
    this.status = event;
    console.log("selected:" + JSON.stringify(this.status));
  }
  selectpaymentStatus(event: any) {
    //update the ui
    this.paymentStatus = event.target.value;
    console.log("selected:" + JSON.stringify(this.paymentStatus));
  }

  
  

  login(loginData) {

    let url = this.baseUrl + '/portal/login';
    return this.httpClient.post(url, loginData).subscribe((data: any) => {
      if (data.messages == "User credentials do not match!") {
        data.token = null;
        console.log('username wrong')
      } else {
        let authToken = data.authToken;
        this.loginid = data.payload.data;
        let deviceId: any = this.loginData.deviceId;
        this.authToken = data.authToken;
      }
    })
  }

  //SALES ORDER
  getdetails() {
    let deviceId = sessionStorage.getItem('deviceId');
    sessionStorage.setItem('authToken', this.authToken);
    sessionStorage.setItem('loginId', this.loginid);
    let url = this.serviceUrl + "/tenants/webrole?null&_" + deviceId; //original api
    this.httpClient.get(url).subscribe((data: any) => {
      let webrole = JSON.parse(data.payload);
      console.log('webrole:' + webrole);
      let tenantList = webrole.tenantRolesList;
      this.tenantList = tenantList;
      for (let i = 0; i < tenantList.length; i++) {
        this.tenantid = tenantList[i].tenantId;
        let tenantid = this.tenantid;
        console.log("tenantidlist:" + tenantid);
      }
    })
  }

  getSession() {
    let deviceId = localStorage.getItem('deviceId');
    console.log("deviceId:" + deviceId);
    let url = this.serviceUrl + "/suppliers/sessionvariables?null&_=" + deviceId;
    this.httpClient.get(url).subscribe((data: any) => {
      console.log('sessionvariables:' + JSON.stringify(data));
    })
  }

  getInvoice() {
    let deviceId = sessionStorage.getItem('deviceId');
    console.log('deviceId:' + deviceId);
    console.log("startdate:" + this.startdate);
    let startdate = this.startdate;
    let enddate = this.enddate;
    let url = this.serviceUrl + "/invoice/suppliers/pharmacies/invoices/list?offset=0&size=10&sdate="+startdate + "&edate=" + enddate + "&null&_=" + deviceId;
    return this.httpClient.get(url).subscribe((data: any) => {
      let invoicedata = JSON.parse(data.payload);
      let invoicelist = invoicedata.supplierInvoiceHeadersArrayListBO
      this.invoicelist = invoicelist;
      let supplierid = invoicelist.supplierId;
      for(let i = 0;i<invoicelist.length; i++){
        let supplierid = invoicelist[i].supplierId;
        console.log("supplierid:" + supplierid);
        sessionStorage.setItem('supplierid' , supplierid );
      }
    })
  }

  getInvoiceId(invoicenum: any) {
    this.invoicenum = invoicenum;
  }

  search() {
    let deviceId = sessionStorage.getItem('deviceId');
    let startdate = this.startdate;
    let enddate = this.enddate;
    let status = this.status;
    let paymentStatus = this.paymentStatus;
    let url = this.serviceUrl + "/invoice/suppliers/pharmacies/invoices/list?offset=0&size=10&sdate=" + startdate + "&edate=" + enddate + "&status=" + status + "&paymentstatus=" + paymentStatus + "&null&_="+deviceId;
    this.httpClient.get(url).subscribe((data: any) => {
      let jsonObj =  JSON.parse(data.payload);
      console.log("jsonObj:" + JSON.stringify(jsonObj));
      let invoicelist = jsonObj.supplierInvoiceHeadersArrayListBO
      this.invoicelist = invoicelist;
      let supplierid = invoicelist.supplierId;
      for(let i = 0;i<invoicelist.length; i++){
        let supplierid = invoicelist[i].supplierId;
      }
  });
}
 

  getDetailsid() {
    let deviceId = sessionStorage.getItem('deviceId');
    let invoicenum = this.invoicenum;
    console.log("invoiceid:" + invoicenum);
    let url = this.serviceUrl + "/invoice/suppliers/pharmacies/invoices/details?inum=" + invoicenum + "&null&_=" + deviceId;
    return this.httpClient.get(url).subscribe((data: any) => {
      let saledetaillist = JSON.parse(data.payload);
      let saledetails = saledetaillist.supplierInvoiceDetailsBOs;
      let pharmacyName = saledetaillist.pharmacyName;
      let ponum = saledetaillist.poNumber;
      let invnum = saledetaillist.invoiceNumber;
      let totalamt = saledetaillist.totalUnitAmount;
      this.totalunitamt = totalamt;
      let gstamt = saledetaillist.totalGstAmount;
      let gsttype = saledetaillist.additionalGstType;
      this.gsttype = gsttype;
      this.totalgstamt = gstamt;
      this.invnum = invnum;
      this.ponumber = ponum;
      console.log("pnum" + ponum);
      this.pharmacyname = pharmacyName;
      console.log("pharmacyName:" + pharmacyName);
      this.saledetails = saledetails;



    })
  }


  getpharma() {

    let deviceId = sessionStorage.getItem('deviceId')
    console.log("authTokenfromstorage:" + localStorage.getItem('authToken'));
    console.log("deviceId:" + deviceId)
    let url = this.serviceUrl + "/suppliers/preferred/pharmacies/details?null&_=" + deviceId;
    return this.httpClient.get(url).subscribe((data: any) => {
      let jsonObj = JSON.parse(data.payload);
      // console.log('jsonObj:' + JSON.stringify(jsonObj));
      let prefferrdPharmacyData = jsonObj.pharmaciesList;
      this.pharmaname = prefferrdPharmacyData;      
    })
  }

  getPharmabyId(event){
    this.pharmaid = event.target.value;    
    console.log("pid:" + this.pharmaid);
  }


  getTenantId() {
    console.log("tenantid:" + this.tenantid);
    localStorage.setItem('tenantid', this.tenantid);
    this.router.navigate(['home']);
  }


//PURCHASE ORDER API's
   pharmacyorder(){
     let supplierid = sessionStorage.getItem('supplierid');
     let url = this.serviceUrl + "/po/orders/list?size=10&offset=0&sid="+ supplierid +"&sdate=2018-08-01&edate=2018-08-06&null&_=1531812026726"
      this.httpClient.get(url).subscribe((data:any)=>{
        let jsonObj = JSON.parse(data.payload)
        let polist = jsonObj.purchaseOrderHeaderBO;
        this.polist = polist;
       
      }) 
   }

   pobyId(pid:any,pnum:any){
    this.pid = pid; 
    console.log("pid:" + this.pid);
    this.pnum = pnum;
    console.log("pnum:" + this.pnum);
  }


  displaypobyId(){
    let url = this.serviceUrl + "/po/orders/details?pid=" + this.pid + "&pnum=" + this.pnum;
    return this.httpClient.get(url).subscribe((data:any)=>{
      let jsonObj = JSON.parse(data.payload);
      console.log('jsonObj:' + JSON.stringify(jsonObj));
      let polist = jsonObj.purchaseOrderDetailBO;
      let poNumber = jsonObj.poNumber;
      let poDate = jsonObj.poDate;
      let pharmacyName = jsonObj.pharmacyName;
      this.polistbyId = polist;
      this.pname = pharmacyName;
      this.poDate = poDate;
      this.ponumber = poNumber;
      for(let i = 0;i<polist.length;i++){
      this.tci = polist[i].tradeCompositeId;
      this.qo = polist[i].quantityOrdered;
      let tci =this.tci;
      let qo = this.qo;
    console.log('tci:' + tci);
    console.log('qo:' + qo);
    }
      
    })
  }
  generatePo() {
    let detailsBOList ={
      detailsBOList:[{
        tradeCompositeId:this.tci,
        quantityOrdered:this.qo
     
      }]
    } 
    let url = this.serviceUrl + '/suppliers/potoinvoice';
    return this.httpClient.post(url,detailsBOList).subscribe((data: any) => {
      let jsonObj = JSON.parse(data.payload);
      console.log("jsonObj:" + JSON.stringify(jsonObj));
      let poinvoice = jsonObj.supplierStocksBO;
      console.log("poinvoice:" + JSON.stringify(poinvoice));
      this.poinvoice = poinvoice;
        })
      }
  //search
  searchPOList() {
    let deviceId = sessionStorage.getItem('deviceId');
    let supplierid =  sessionStorage.getItem('supplierid');
    let startdate = this.startdate;
    let enddate = this.enddate;
    let status = this.status;
    let url = this.serviceUrl + "/po/orders/list?size=10&offset=0&sid="+ supplierid + "&status="+status+"&sdate="+startdate+"&edate="+enddate+"&null&_=" + deviceId;
    return this.httpClient.get(url).subscribe((data:any)=>{
      let jsonObj = JSON.parse(data.payload);
      console.log('jsonObj:' + JSON.stringify(jsonObj));
      let polist = jsonObj.purchaseOrderDetailBO;
      let poNumber = jsonObj.poNumber;
      let poDate = jsonObj.poDate;
      let pharmacyName = jsonObj.pharmacyName;
      this.polistbyId = polist;
      this.pname = pharmacyName;
      this.poDate = poDate;
      this.ponumber = poNumber;
    //   for(let i = 0;i<polist.length;i++){
    //   this.tci = polist[i].tradeCompositeId;
    //   this.qo = polist[i].quantityOrdered;
    //   let tci =this.tci;
    //   let qo = this.qo;
    // console.log('tci:' + tci);
    // console.log('qo:' + qo);
    //   }
    })
  }

  
  //Create Invoice

  searchcreate(event) {
    let text =this.text;
    console.log("text:" + text);
    let url = this.serviceUrl + "/suppliers/tci?offset=0&size=25&tci="+event.query+"&null&_=1533625394356"
    this.httpClient.get(url).subscribe((data:any) => {
        let jsonObj = JSON.parse(data.payload);
        console.log("result:" + JSON.stringify(data));
        let tcilist = jsonObj.tradeCompositeIdSearchBOList;
        this.results = tcilist;
        for(let i=0;i<tcilist.length;i++){
          let tci = tcilist[i].tradeCompositeId;
          
          console.log("tci:" + tci)
        }
        
          });
}

  createInvoice(selecteddrug){
    this.selecteddrug = selecteddrug;
    let deviceId = localStorage.getItem('deviceId');
    let url = this.serviceUrl + '/suppliers/tci/bill?tradeid=' + selecteddrug +'&null&_=' + deviceId
    return this.httpClient.get(url).subscribe((data:any)=>{
      let jsonObj = JSON.parse(data.payload);
      let supplierStock = jsonObj.supplierStocksBO;
      console.log("DrugDetails:" + JSON.stringify(supplierStock));
      this.supplierStocks = supplierStock;
      
      let expdate = supplierStock.expiryDate;
      this.exp = expdate;
      console.log("expdate:" + expdate);

     
      
      for(let i=0;i<supplierStock.length;i++){
        this.gstamt ={
         taxOnWhat : supplierStock[i].taxOnWhat,
         MRP : supplierStock[i].stockUnitMaximumRetailPrice,
         salerate : supplierStock[i].stockUnitSalesPrice,
         totalquan : supplierStock[i].quantityOrdered,
         schemedisc : supplierStock[i].stockUnitSchemeDiscountPercentage,
      }
       this.sgst = {

        sgstPercentage : supplierStock[i].sgstPercentage,
        cgstPercentage : supplierStock[i].cgstPercentage,

      }

     
        this.gstper = parseFloat(supplierStock[i].sgstPercentage) + parseFloat(supplierStock[i].sgstPercentage)
      

      this.igst = {
        cgstPercentage : 0,
        igstPercentage : parseFloat(supplierStock[i].cgstPercentage) + parseFloat(supplierStock[i].sgstPercentage),
      }

      
      
      //   if(this.gsttype == 'sgst'){  
      //   this.sgstpercent = sgst;
      //   this.cgstpercent = cgst;
        
      //   }
      //  else if(this.gsttype == 'igst'){
      //   this.cgstpercent = 0.00;
      //   this.igstpercent = parseFloat(cgst) + parseFloat(sgst);
      // }
      this.gstamtArray.push(this.gstamt);
      this.respArray.push(this.sgst);
      this.igstArray.push(this.igst);
      this.gstperArray.push(this.gstper)
      console.log("gst:" +JSON.stringify(this.respArray));
      }
      
      


    })
    
  }

  //Schemes

  schemeList(){
    let deviceId = sessionStorage.getItem('deviceId');
    let url=this.serviceUrl + "/suppliers/scheme/list?size=10&page=0&null&_="+deviceId;
    return this.httpClient.get(url).subscribe((data:any)=>{
      let jsonObject=JSON.parse(data.payload);
      console.log("jsonObj:" + JSON.stringify(jsonObject));
      let schemelist=jsonObject.supplierSchemeMasterBOSummaryBOList;
      this.schemelist=schemelist;
      let supplierid = schemelist.supplierId;
      for(let i = 0;i<schemelist.length; i++){
        let supplierid = schemelist[i].supplierId;
        console.log("supplierid:" + supplierid);
        sessionStorage.setItem('supplierid' , supplierid );
      }
    });
  }

  editScheme(schemeObj){
    
    
  }
 

  quantitys(event){
    this.quantity = event.target.value;
    console.log("quantity:" + this.quantity);
    
  }
  salerate(event){
    this.salerates = event.target.value;
    console.log("salesrate:" + this.salerates);
  }
  saveCI(){
    let totalAmt = parseFloat(this.gstper);
      // ((this.respArray.gstper / 100) * ((this.salerates * this.quantity) - this.gstamtArray.schemedisc) * ((100 - this.gstamt.schemedisc) / 100))
      console.log('totalamt:' + JSON.stringify(totalAmt));

    }
  
  total(){
    this.totalamt = parseFloat(this.quantity) * parseFloat(this.salerates);
    console.log("total:" + this.totalamt);
  }

  caculateinvoice(){
    if(this.gstamt.taxOnWhat == "ME"){
      this.gstMRP = (this.gstamt.MRP - ((this.igstArray.gstper/(100+this.igstArray.gstper))*this.gstamt.MRP));
      console.log('gstMRP:' + this.gstamt);
    }
  }

  getGstType(){
    let pharmaid =  this.pharmaid 
    let deviceId = sessionStorage.getItem('deviceId')
    let url = this.serviceUrl + "/suppliers/pharmacy/findgsttype?pharmacyId=" + pharmaid + "&null&_=" + deviceId;
    return this.httpClient.get(url).subscribe((data:any)=>{
      let jsonObj = JSON.parse(data.payload);
      let gsttype = jsonObj.addlGstType;
      this.gsttype = gsttype;
      console.log("gsttype:" + gsttype);
    })

  }

  getDetailByBatch(){
    let selecteddrug = this.selecteddrug;
    console.log("selected:" + selecteddrug);
  }

  //PURCHASE INWARD

  selectcacfinward(selectcacf,selectcacfname){
    this.selectcacf = selectcacf;
    this.cacfname = selectcacfname;
    console.log("selectcacf:" + selectcacf);
    console.log("selectcacfname:" + selectcacfname);

  }

  searchcacf(event) {
    let text =this.text;
    console.log("text:" + text);
    let deviceId = sessionStorage.getItem('deviceId');
    let url = this.serviceUrl + "/ops/cacf/list?startPageNum=0&pageSize=25&cacfagentname="+event.query+"&null&_="+deviceId;
    this.httpClient.get(url).subscribe((data:any) => {
        let jsonObj = JSON.parse(data.payload);
        console.log("result:" + JSON.stringify(data));
        let tcilist = jsonObj.caCfAgentsBOList;
        this.cacf = tcilist;
        console.log("cacf:" + tcilist)
        
          });
}

  postStocks(){
    let supplierStocksBO ={
      supplierStocksBO:[{
        tradeCompositeId:this.drugname,
        batchNumber:this.batchno,
        suppliedWhen:this.taxmodal,
        manufacturerMnemonic:"-",

     
      }]
    }    

    console.log('postStocks:' + JSON.stringify(supplierStocksBO));


} 

  logout() {
    return new Promise((resolve, reject) => {
      let deviceId = localStorage.getItem('deviceId');
      let url = this.baseUrl + "/services/users/logout?null&_=" + deviceId;

      this.httpClient.get(url).subscribe(data => {
        localStorage.clear();
        sessionStorage.clear();
        this.router.navigateByUrl('/')
      }, (err) => {
        reject(err);

      })
    })
  }
}

