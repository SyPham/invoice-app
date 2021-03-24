import { ContainerComponent } from './container/container.component';
import { AccountComponent } from './account/account.component';
import { CompanyComponent } from './company/company.component';

// Components Routing
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  TrackingRoutingModule } from './tracking-routing.module';
import { GridAllModule } from '@syncfusion/ej2-angular-grids';
import { SearchInvoiceComponent } from './search-invoice/search-invoice.component';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { InvoiceDetailComponent } from './search-invoice/invoice-detail/invoice-detail.component';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TrackingRoutingModule,
    GridAllModule,
    DropDownListModule,
    DatePickerModule
  ],
  declarations: [
    CompanyComponent,
    AccountComponent,
    ContainerComponent,
    SearchInvoiceComponent,
    InvoiceDetailComponent
  ]
})
export class TrackingModule { }
