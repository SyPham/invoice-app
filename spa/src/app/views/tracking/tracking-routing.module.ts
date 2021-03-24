import { SearchInvoiceComponent } from './search-invoice/search-invoice.component';
import { ContainerComponent } from './container/container.component';
import { AccountComponent } from './account/account.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyComponent } from './company/company.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Tracking'
    },
    children: [
      {
        path: 'invoice',
        loadChildren: () => import('./invoice/invoice.module').then(m => m.InvoiceModule)
      },
      {
        path: 'company',
        component: CompanyComponent,
        data: {
          title: 'Company'
        }
      },
      {
        path: 'account',
        component: AccountComponent,
        data: {
          title: 'Account'
        }
      },
      {
        path: 'container',
        component: ContainerComponent,
        data: {
          title: 'Container'
        }
      },
      {
        path: 'search-invoice',
        component: SearchInvoiceComponent,
        data: {
          title: 'Search Invoice'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrackingRoutingModule {}
