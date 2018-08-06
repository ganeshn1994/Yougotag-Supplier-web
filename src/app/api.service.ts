import { Injectable } from '@angular/core';
import {  HttpClient,HttpHeaders,HttpInterceptor,HttpHandler,  HttpRequest,  HttpResponse,  HttpEvent,  HttpEventType,  HttpParams } from '@angular/common/http'
import {Http, Headers} from '@angular/http';
import { Router } from '@angular/router'
import { Observable } from 'rxjs'
import { reject } from 'q';
import { environment } from '../app/config'
import {  RequestOptions, BaseRequestOptions, RequestOptionsArgs } from '@angular/http';




@Injectable({
  providedIn: 'root'
})
export class ApiService {

 
  url:string;
  token:string;
  data: any = [];
  payload: any ;
  startdate:any;
  enddate:any;
  status:any;
  paymentStatus:any;
  pharmaname = [];
  invoicelist = [];
  invoicenum = [];
  tenantList = [];
  tenantid:any = [];
  tenantname = [];
  loginid:any;
  authToken:any;
  saledetails:any = [];
  pharmacyname:any;
  ponumber:any;
  invnum:any;
  totalunitamt:any;
  totalgstamt:any;
  gsttype:any;


  baseUrl = environment.baseUrl;
  serviceUrl = environment.serviceUrl;

  loginData = {
    deviceId : Date.now()
  }
  
 
  constructor(private httpClient: HttpClient, public router:Router) {

  }


  

   public getToken(): string {
    return localStorage.getItem('authToken');
  }

  search(){
    console.log("startdate:" + this.startdate);
    console.log("status" + status)
  }
   
   login(loginData){
   
     let url = this.baseUrl + '/portal/login';
     return this.httpClient.post(url,loginData).subscribe((data : any)=>{
     if(data.messages == "User credentials do not match!"){
       data.token = null;
       console.log('username wrong')
     }else{
       let authToken = data.authToken;
      //  console.log("authToken:" + authToken)
       this.loginid  = data.payload.data;
       let deviceId:any = this.loginData.deviceId;
       this.authToken = data.authToken;
       
      //  this.router.navigate(['home'])
          }     
      })
   }
   getdetails(){
     let deviceId = sessionStorage.getItem('deviceId');
       sessionStorage.setItem('authToken',this.authToken);
       sessionStorage.setItem('loginId',this.loginid);
     let url= this.serviceUrl + "/tenants/webrole?null&_" + deviceId; //original api
     this.httpClient.get(url).subscribe((data : any)=>{
       let webrole = JSON.parse(data.payload);
       let tenantList = webrole.tenantRolesList;
       this.tenantList = tenantList;
      for(let i=0;i<tenantList.length;i++){
        this.tenantid = tenantList[i].tenantId;
        let tenantid = this.tenantid;
        console.log("tenantidlist:"  + tenantid);
      }
     })
   }

   getSession(){
     let deviceId = localStorage.getItem('deviceId');
     console.log("deviceId:" + deviceId); 
     let url = this.serviceUrl + "/suppliers/sessionvariables?null&_=" + deviceId;
     this.httpClient.get(url).subscribe((data : any)=>{
       console.log('sessionvariables:' + JSON.stringify(data));
     })
   }

   getInvoice(){
    let deviceId = sessionStorage.getItem('deviceId');
    console.log('deviceId:' + deviceId);
    let url = this.serviceUrl + "/invoice/suppliers/pharmacies/invoices/list?offset=0&size=10&sdate=2018-08-01&edate=2018-08-02&null&_=" + deviceId;
    // let url = './assets/json/invoices.json';
    return this.httpClient.get(url).subscribe((data:any)=>{
      let invoicedata = JSON.parse(data.payload);
      let invoicelist = invoicedata.supplierInvoiceHeadersArrayListBO
      this.invoicelist = invoicelist;
      //  for(let i=0;i<invoicelist.length;i++){
      //   this.invoicenum = invoicelist[i].invoiceNumber;
      //   let invoicenum = this.invoicenum;
      //   console.log("invoicelist:" + this.invoicenum);
      // }

    })
   }

   getInvoiceId(invoicenum:any){
    this.invoicenum = invoicenum;
    // console.log("invoiceid:" + invoicenum);
   }

   getDetailsid(){
    let deviceId = sessionStorage.getItem('deviceId');
     let invoicenum = this.invoicenum;
     console.log("invoiceid:" + invoicenum);
    let url = this.serviceUrl + "/invoice/suppliers/pharmacies/invoices/details?inum=" + invoicenum + "&null&_=" + deviceId;
    return this.httpClient.get(url).subscribe((data:any)=>{
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
      this.pharmacyname = pharmacyName;
      console.log("pharmacyName:" + pharmacyName); 
      this.saledetails = saledetails;
    

     
    })
   }
   getpharma(){

    let deviceId = sessionStorage.getItem('deviceId')
    console.log("authTokenfromstorage:" + localStorage.getItem('authToken'));
    console.log("deviceId:"  + deviceId)
    let url = this.serviceUrl + "/suppliers/preferred/pharmacies/details?null&_=" + deviceId;
    // let url = './assets/json/pharmacieslist.json'
    return this.httpClient.get(url).subscribe((data : any)=>{
      let jsonObj = JSON.parse(data.payload);
      console.log("jsonObj:"+jsonObj);
      let prefferrdPharmacyData = jsonObj.pharmaciesList;
      this.pharmaname = prefferrdPharmacyData;
      console.log("pharamaname:" + JSON.stringify(this.pharmaname));
  
    })
   }
  

   getTenantId(){ 
    console.log("tenantid:" + this.tenantid);
    localStorage.setItem('tenantid',this.tenantid);
    this.router.navigate(['home']);
    
   }

  //  pharmacyorder(){
  //    let url = this.serviceUrl + "/po/orders/list?size=10&offset=0&sid=2610&sdate=2018-07-01&edate=2018-07-17&null&_=1531812026726"
  //     this.httpClient.get(url).subscribe(data=>{
  //       console.log("pharmacy" + data);
  //     }) 
  //  }

   //search
   displayPOList(pharmacyid,status,startdate,enddate){
     console.log('search');
   }

   logout(){
     return new Promise((resolve,reject)=>{
      let deviceId = localStorage.getItem('deviceId');
      let url= this.baseUrl + "/services/users/logout?null&_=" + deviceId;
      
       this.httpClient.get(url).subscribe(data=>{
        localStorage.clear();
        sessionStorage.clear();
        this.router.navigateByUrl('/')
       },(err)=>{
         reject(err);
       
       })
     })
   }
}

