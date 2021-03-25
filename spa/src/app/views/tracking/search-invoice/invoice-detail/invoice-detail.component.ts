import { CompanyService } from './../../../../shared/_services/company.service';
import { Invoice } from './../../../../shared/_models/invoice';
import { ContainerService } from './../../../../shared/_services/container.service';
import { InvoiceService } from './../../../../shared/_services/invoice.service';
import { AlertifyService } from './../../../../shared/_services/alertify.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { InvoiceInformationComponent } from '../invoice-information/invoice-information.component';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.scss']
})
export class InvoiceDetailComponent implements OnInit {

  invoice: any;
  data = [];
  @ViewChild('grid') grid: GridComponent;
  toolbarOptions = ['Search'];
  pageSettings = { pageCount: 20, pageSizes: true, pageSize: 10 };
  fieldsCompany: object = { text: 'name', value: 'name' };
  fieldsContainer: object = { text: 'containerNo', value: 'containerNo' };
  filterSettings = { type: 'Excel' };
  roleData: object;
  containerData: Object;
  containerID: any;
  companyID: any;
  status: any;
  statusData = ['Draft DOE', 'Pending Shipment', 'Done'];
  companydata: Object;
  isShowInvoice = true;
  constructor(
    private invoiceService: InvoiceService,
    private alertify: AlertifyService,
    private companyService: CompanyService,
    private containerService: ContainerService,
    private route: ActivatedRoute,
    private router: Router,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.companyID = this.route.snapshot.params.companyID || 0;
    this.status = this.route.snapshot.params.status || '';
    this.getAll();
    this.getAllContainer();
    this.getAllCompany();
  }
  // api
  getAll() {
    this.invoiceService.filter('', this.companyID, this.status).subscribe((res: []) => {
      this.data = res;
    });
  }
  getAllCompany() {
    this.companyService.getAllCompany().subscribe(res => {
      this.companydata = res;
    });
  }
  getAllContainer() {
    this.containerService.getAllContainer().subscribe(res => {
      this.containerData = res;
    });
  }

  recordDoubleClick(args) {
    this.router.navigate(['/tracking/search-invoice/info/' + args.rowData.id]);
  }
  back() {
    this.router.navigate(['/tracking/search-invoice']);
  }
  detail(data)  {
    this.router.navigate(['/tracking/search-invoice/info/' + data.id]);
  }
  // grid event
  // end event
  NO(index) {
    return (this.grid.pageSettings.currentPage - 1) * this.pageSettings.pageSize + Number(index) + 1;
  }
  receiveMessage($event) {
    this.isShowInvoice = $event as boolean ;
  }
  actionFailure(args) {
    console.log(args);
  }

}


