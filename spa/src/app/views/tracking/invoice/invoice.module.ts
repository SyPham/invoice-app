import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { InvoiceEditComponent } from './invoice-edit/invoice-edit.component';
import { InvoiceAddComponent } from './invoice-add/invoice-add.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceComponent } from './invoice.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GridAllModule } from '@syncfusion/ej2-angular-grids';
import { InvoiceRoutingModule } from './invoice.routing.module';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    InvoiceRoutingModule,
    GridAllModule,
    DropDownListModule,
    DatePickerModule,
    ReactiveFormsModule,
  ],
  declarations: [
    InvoiceComponent,
    InvoiceAddComponent,
    InvoiceEditComponent
  ]
})
export class InvoiceModule { }
