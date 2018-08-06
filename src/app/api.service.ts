import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpEvent, HttpEventType, HttpParams } from '@angular/common/http'
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router'
import { Observable } from 'rxjs'
import { reject } from 'q';
import { environment } from '../app/config'
import { RequestOptions, BaseRequestOptions, RequestOptionsArgs } from '@angular/http';
import { InputTextModule } from 'primeng/inputtext';




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
  invoicenum = [];
  tenantList = [];
  tenantid: any = [];
  tenantname = [];
  loginid: any;
  authToken: any;
  saledetails: any = [];
  pharmacyname: any;
  ponumber: any;
  invnum: any;
  totalunitamt: any;
  totalgstamt: any;
  gsttype: any;
  polist:any = [];
  selectedpharma:any;


  baseUrl = environment.baseUrl;
  serviceUrl = environment.serviceUrl;

  loginData = {
    deviceId: Date.now()
  }


  constructor(private httpClient: HttpClient, public router: Router) {

  }




  public getToken(): string {
    return localStorage.getItem('authToken');
  }

  

  login(loginData) {

    let url = this.baseUrl + '/egangaa-portal/login';
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
    let url = this.serviceUrl + "/invoice/suppliers/pharmacies/invoices/list?offset=0&size=10&sdate=2018-08-01&edate=2018-08-02&null&_=" + deviceId;
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

   pharmacyorder(){
     let supplierid = sessionStorage.getItem('supplierid');
     let url = this.serviceUrl + "/po/orders/list?size=10&offset=0&sid="+ supplierid +"&sdate=2018-08-01&edate=2018-08-03&null&_=1531812026726"
      this.httpClient.get(url).subscribe((data:any)=>{
        let jsonObj = JSON.parse(data.payload)
        console.log("pharmacy" + JSON.stringify(jsonObj));
        let polist = jsonObj.purchaseOrderHeaderBO;
        this.polist = polist;
      }) 
   }

  //search
  displayPOList(pharmacyid, status, startdate, enddate) {
    console.log('search');
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

