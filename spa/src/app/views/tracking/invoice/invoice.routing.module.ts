import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvoiceAddComponent } from './invoice-add/invoice-add.component';
import { InvoiceEditComponent } from './invoice-edit/invoice-edit.component';
import { InvoiceComponent } from './invoice.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Invoice'
    },
    children: [
      {
        path: '',
        component: InvoiceComponent,
        data: {
          title: ''
        }
      },
      {
        path: 'add',
        component: InvoiceAddComponent,
        data: {
          title: 'Add'
        }
      },
      {
        path: 'edit/:invoiceID',
        component: InvoiceEditComponent,
        data: {
          title: 'Edit'
        }
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule { }
