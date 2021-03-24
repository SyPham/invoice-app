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
export class InvoiceModule { constructor(
  public translate: TranslateService
) {
  translate.addLangs(['en', 'zh', 'ja' ]);
  const lang = localStorage.getItem('lang');
  if (lang) {
    translate.setDefaultLang(lang);
  } else {
    translate.setDefaultLang('en');
  }
}
}
export function httpTranslateLoader(http: HttpClient) {
return new TranslateHttpLoader(http);
}
