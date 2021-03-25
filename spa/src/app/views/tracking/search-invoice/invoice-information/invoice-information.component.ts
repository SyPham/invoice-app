import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from '../../../../shared/_services/alertify.service';
import { CompanyService } from '../../../../shared/_services/company.service';
import { ContainerService } from '../../../../shared/_services/container.service';
import { InvoiceService } from '../../../../shared/_services/invoice.service';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { Invoice } from '../../../../shared/_models/index';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
@Component({
  selector: 'app-invoice-information',
  templateUrl: './invoice-information.component.html',
  styleUrls: ['./invoice-information.component.scss']
})
export class InvoiceInformationComponent implements OnInit, OnDestroy{
  invoice: Invoice = {} as Invoice;
  companyData;
  fields = { text: 'name', value: 'name' };
  statusData = ['All', 'Draft DOE', 'Pending Shipment', 'Done'];
  status: any;
  containerData = [];
  filterSettings = { type: 'Excel' };
  pageSettings = { pageCount: 20, pageSizes: true, pageSize: 10 };
  @ViewChild('grid') grid: GridComponent;
  invoiceNo;
  companyID = 0;
  isShow = false;
  invoiceData: any;
  subscription: Subscription = new Subscription();
  id: any;
  constructor(
    private companyService: CompanyService,
    private containerService: ContainerService,
    private invoiceService: InvoiceService,
    private alertify: AlertifyService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location

  ) {
  }
  ngOnDestroy(): void {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params.id || 0;
    this.getById();
  }
  getContainerById() {
    if (this.invoice?.containerID !== undefined) {
      this.containerService.GetContainerById(this.id).subscribe((res: any) => {
        this.containerData = res;
        this.isShow = true;
      });
    }
  }
  getById() {
      this.invoiceService.getById(this.id).subscribe((res: any) => {
        this.invoice = res;
      });
  }
  created() {
    this.getContainerById();
  }
  back() {
    this.location.back();
  }
  sendMessage() {
  }
  dataBound() {
    this.grid.autoFitColumns();
  }
}
