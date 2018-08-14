import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpEvent, HttpEventType, HttpParams } from '@angular/common/http'
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router'
import { Observable } from 'rxjs'
import { reject } from 'q';
import { environment } from '../app/config'
import { RequestOptions, BaseRequestOptions, RequestOptionsArgs } from '@angular/http';
import { InputTextModule } from 'primeng/inputtext';
import { parse } from 'url';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';





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

  loginData = {
    deviceId: Date.now()
  }
 


  baseUrl = environment.baseUrl;
  serviceUrl = environment.serviceUrl;

  


  constructor(private httpClient: HttpClient, public router: Router) { }

 getDefaultDate(){
    this.datePickerConfig = Object.assign({},{containerClass:'theme-dark-blue',showWeekNumbers:false,dateInputFormat:'YYYY/MM/DD'});
    var date = new Date();
    this.startdate = date.getFullYear()  + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('01');
    this.enddate = date.getFullYear()  + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2) ;
  }

  public getToken(): string {
    return localStorage.getItem('authToken');
  }

  selectChangeHandler(event: any) {
    //update the ui
    this.selectedpharma = event.target.value;
    console.log("selected:" + JSON.stringify(this.selectedpharma));
  }
  selectStatus(event: any) {
    //update the ui
    this.status = event.target.value;
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
      let prefferrdPharmacyData = jsonObj.pharmaciesList;
      this.pharmaname = prefferrdPharmacyData;
    })
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
    console.log("selected" +  selecteddrug);
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

