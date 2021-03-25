import { InvoiceService } from './../../../shared/_services/invoice.service';
import { ContainerService } from './../../../shared/_services/container.service';
import { Invoice } from './../../../shared/_models/invoice';
import { CompanyService } from '../../../shared/_services/company.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { EmitType } from '@syncfusion/ej2-base';
import { FilteringEventArgs, highlightSearch, DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { Query } from '@syncfusion/ej2-data';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-invoice',
  templateUrl: './search-invoice.component.html',
  styleUrls: ['./search-invoice.component.scss']
})
export class SearchInvoiceComponent implements OnInit {
  companyData;
  fields = { text: 'name', value: 'name' };
  statusData = ['Draft DOE', 'Pending Shipment', 'Done'];
  status: any;
  invoice: Invoice = {} as Invoice;
  containerData: Object;
  filterSettings = { type: 'Excel' };
  pageSettings = { pageCount: 20, pageSizes: true, pageSize: 10 };
  @ViewChild('grid') grid: GridComponent;
  invoiceNo;
  companyID;
  isShow = false;
  invoiceData: any;
  constructor(
    private companyService: CompanyService,
    private containerService: ContainerService,
    private invoiceService: InvoiceService,
    private router: Router,

  ) { }

  ngOnInit() {
    this.loadCompany();
    this.getContainerByInvoiceId();
  }
  dataBound() {
    this.grid.autoFitColumns();
  }
  // api
  getContainerByInvoiceId() {
    if (this.invoice?.id !== undefined) {
      this.containerService.getContainerByInvoiceId(this.invoice.id).subscribe(res => {
        this.containerData = res;
      });
    }
  }
  reset() {
    this.isShow = false;
    this.status = '';
    this.companyID = 0;
    this.invoiceNo = '';
    this.invoice = {} as Invoice;
  }
  filter() {
    this.isShow = true;
    if (this.invoiceNo !== undefined) {
      this.invoiceService.filter(this.invoiceNo, this.companyID, this.status).subscribe(res => {
        this.invoiceData = res;
        this.invoice = this.invoiceData.length > 0 ? this.invoiceData[0] : {} as Invoice;
      });
    }
  }
  loadCompany() {
    this.companyService.getAllCompany().subscribe( data => {
      this.companyData = data;
    });
  }
  onFiltering: EmitType<FilteringEventArgs> = (
    e: FilteringEventArgs
  ) => {
    let query: Query = new Query();
    // frame the query based on search string with filter type.
    query =
      e.text !== '' ? query.where('name', 'contains', e.text, true) : query;
    // pass the filter data source, filter query to updateData method.
    e.updateData(this.companyData as any, query);
  }

  onChange(args) {
    this.companyID = args.itemData.id;
  }
  onChangeStatus(args) {
    this.status = args.value;
  }
  NO(index) {
    return (this.grid.pageSettings.currentPage - 1) * this.pageSettings.pageSize + Number(index) + 1;
  }
  goToDetail() {
    this.router.navigate([`/tracking/search-invoice/detail/${this.companyID}/${this.status}`]);
  }
}
