import { loadCldr, L10n, setCulture } from '@syncfusion/ej2-base';
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
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
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
    InvoiceRoutingModule,
    GridAllModule,
    DropDownListModule,
    DatePickerModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  declarations: [
    InvoiceComponent,
    InvoiceAddComponent,
    InvoiceEditComponent
  ]
})
export class InvoiceModule {
    constructor(
      public translate: TranslateService
    ) {
      translate.addLangs(['en', 'zh', 'ja']);
      const lang = localStorage.getItem('lang');
      if (lang) {
        switch (lang) {
          case 'en':
            setTimeout(() => {
              L10n.load(require('../../../../assets/ej2-lang/en.json'));
              setCulture(lang);
            });
            break;
          case 'zh':
            setTimeout(() => {
              L10n.load(require('../../../../assets/ej2-lang/zh.json'));
              setCulture(lang);
            });
            break;
          case 'ja':
            setTimeout(() => {
              L10n.load(require('../../../../assets/ej2-lang/ja.json'));
              setCulture(lang);
            });
            break;
        }
        translate.setDefaultLang(lang);
      } else {
        setTimeout(() => {
          L10n.load(require('../../../../assets/ej2-lang/en.json'));
          setCulture('en');
        });
        translate.setDefaultLang('en');
      }
    }
}
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
