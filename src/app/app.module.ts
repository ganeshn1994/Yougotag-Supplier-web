import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ApiService} from '../app/api.service';
import {RouterModule, Routes} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {I1, I4,I6, I5, I7,I8} from '../app/Interceptor/Authinterceptor.service';
import {I2} from '../app/Interceptor/Authinterceptor.service';
import {I3} from '../app/Interceptor/Authinterceptor.service';
import { CookieService } from 'ngx-cookie-service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {ButtonModule} from 'primeng/button';
import {PaginatorModule} from 'primeng/paginator';
import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab
import {MenuItem} from 'primeng/api';
import {AutoCompleteModule} from 'primeng/autocomplete';




import { AppComponent } from './app.component';
import {MatButtonModule} from '@angular/material/button';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {RegisterComponent} from '../app/register/register.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { LoginComponent } from './login/login.component';
import {MatInputModule} from '@angular/material/input';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RequestOptions } from '@angular/http';
import { from } from 'rxjs';
import { PharmacyorderComponent } from './pharmacyorder/pharmacyorder.component';
import { CreateinvoiceComponent } from './createinvoice/createinvoice.component';
import { PurchaseinvoiceComponent } from './purchaseinvoice/purchaseinvoice.component';
import { PurchaseUpdateComponent } from './purchase-update/purchase-update.component';
import { ApprovePaymentsComponent } from './approve-payments/approve-payments.component';
import { ManagePaymentsComponent } from './manage-payments/manage-payments.component';
import { DebitNotesComponent } from './debit-notes/debit-notes.component';
import { SalesReturnComponent } from './sales-return/sales-return.component';
import { CreditNoteComponent } from './credit-note/credit-note.component';
import { FieldAgentComponent } from './field-agent/field-agent.component';
import { AssignAreaComponent } from './assign-area/assign-area.component';
import { SalesTargetComponent } from './sales-target/sales-target.component';
import { PreferredPharmaciesComponent } from './preferred-pharmacies/preferred-pharmacies.component';
import { SchemesComponent } from './schemes/schemes.component';
import { KnowYourMedicineComponent } from './know-your-medicine/know-your-medicine.component';
import { JanitramComponent } from './janitram/janitram.component';




const routes :Routes= [
  {path:'', component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'home', component:HomeComponent},
  {path:'pharmacyorder', component:PharmacyorderComponent},
  {path:'createinvoice',component:CreateinvoiceComponent},
  {path:'purchaseinvoice',component:PurchaseinvoiceComponent},
  {path:'purchaseupdate',component:PurchaseUpdateComponent},
  {path:'approvepayment',component:ApprovePaymentsComponent},
  {path:'managepayment',component:ManagePaymentsComponent},
  {path:'debitnote',component:DebitNotesComponent},
  {path:'salesreturn',component:SalesReturnComponent},
  {path:'creditnote',component:CreditNoteComponent},
  {path:'fieldagent',component:FieldAgentComponent},
  {path:'assignarea',component:AssignAreaComponent},
  {path:'salestarget',component:SalesTargetComponent},
  {path:'preferedpharma',component:PreferredPharmaciesComponent},
  {path:'schemes',component:SchemesComponent},
  {path:'knowmedicine',component:KnowYourMedicineComponent},
  {path:'janitram',component:JanitramComponent}
  
  
]



@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    PharmacyorderComponent,
    CreateinvoiceComponent,
    PurchaseinvoiceComponent,
    PurchaseUpdateComponent,
    ApprovePaymentsComponent,
    ManagePaymentsComponent,
    DebitNotesComponent,
    SalesReturnComponent,
    CreditNoteComponent,
    FieldAgentComponent,
    AssignAreaComponent,
    SalesTargetComponent,
    PreferredPharmaciesComponent,
    SchemesComponent,
    KnowYourMedicineComponent,
    JanitramComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    HttpClientModule,
    MatDialogModule,
    MatCardModule,
    MatFormFieldModule,
    RouterModule.forRoot(routes),
    NgbModule.forRoot(),
    MatInputModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatSidenavModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
     PaginatorModule,
     ButtonModule,
     AccordionModule,
     AutoCompleteModule
  ],
  providers: [ApiService,CookieService ,
  //   {  provide: HTTP_INTERCEPTORS,
  //     useClass: CustomHttpInterceptor,
  //     multi: true
  //  }
{
    provide: HTTP_INTERCEPTORS,
    useClass: I1,
    multi: true
},
{
    provide: HTTP_INTERCEPTORS,
    useClass: I2,
    multi: true
},
{
    provide: HTTP_INTERCEPTORS,
    useClass: I3,
    multi: true
},
{
  provide: HTTP_INTERCEPTORS,
  useClass: I4,
  multi: true
},
{
  provide: HTTP_INTERCEPTORS,
  useClass: I5,
  multi: true
},
{
  provide: HTTP_INTERCEPTORS,
  useClass: I6,
  multi: true
},
{
  provide: HTTP_INTERCEPTORS,
  useClass: I7,
  multi: true
},
{
  provide: HTTP_INTERCEPTORS,
  useClass: I8,
  multi:true
}
],
  bootstrap: [AppComponent]
})
export class AppModule { }
