import { InvoiceInformationComponent } from './search-invoice/invoice-information/invoice-information.component';
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
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { L10n, setCulture, loadCldr,  } from '@syncfusion/ej2-base';
declare var require: any;

loadCldr(
  require('cldr-data/supplemental/numberingSystems.json'),
  require('cldr-data/main/en/ca-gregorian.json'),
  require('cldr-data/main/en/numbers.json'),
  require('cldr-data/main/en/timeZoneNames.json'),
  require('cldr-data/supplemental/weekdata.json')); // To load the culture based first day of week

loadCldr(
  require('cldr-data/supplemental/numberingSystems.json'),
  require('cldr-data/main/ja/ca-gregorian.json'),
  require('cldr-data/main/ja/numbers.json'),
  require('cldr-data/main/ja/timeZoneNames.json'),
  require('cldr-data/supplemental/weekdata.json')); // To load the culture based first day of week

  loadCldr(
  require('cldr-data/supplemental/numberingSystems.json'),
  require('cldr-data/main/zh/ca-gregorian.json'),
  require('cldr-data/main/zh/numbers.json'),
  require('cldr-data/main/zh/timeZoneNames.json'),
  require('cldr-data/supplemental/weekdata.json')); // To load the culture based first day of week

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TrackingRoutingModule,
    GridAllModule,
    DropDownListModule,
    DatePickerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  declarations: [
    CompanyComponent,
    AccountComponent,
    ContainerComponent,
    SearchInvoiceComponent,
    InvoiceDetailComponent,
    InvoiceInformationComponent
  ]
})
export class TrackingModule {
  constructor(
    public translate: TranslateService
  ) {
    translate.addLangs(['en', 'zh', 'ja' ]);
    const lang = localStorage.getItem('lang');
    if (lang) {
      switch (lang) {
        case 'en':
        setTimeout(() => {
          L10n.load(require('../../../assets/ej2-lang/en.json'));
          setCulture(lang);
        });
        break;
        case 'zh':
        setTimeout(() => {
          L10n.load(require('../../../assets/ej2-lang/zh.json'));
          setCulture(lang);
        });
        break;
        case 'ja':
        setTimeout(() => {
          L10n.load(require('../../../assets/ej2-lang/ja.json'));
          setCulture(lang);
        });
        break;
      }
      translate.setDefaultLang(lang);
    } else {
      setTimeout(() => {
        L10n.load(require('../../../assets/ej2-lang/en.json'));
        setCulture('en');
      });
      translate.setDefaultLang('en');
    }
  }
 }
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
