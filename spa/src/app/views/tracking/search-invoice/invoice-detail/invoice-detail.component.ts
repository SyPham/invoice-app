import { CompanyService } from './../../../../shared/_services/company.service';
import { Invoice } from './../../../../shared/_models/invoice';
import { ContainerService } from './../../../../shared/_services/container.service';
import { InvoiceService } from './../../../../shared/_services/invoice.service';
import { AlertifyService } from './../../../../shared/_services/alertify.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.scss']
})
export class InvoiceDetailComponent implements OnInit {

  invoice: any;
  data: any;
  editSettings = { showDeleteConfirmDialog: false, allowEditing: false, allowAdding: false, allowDeleting: true, mode: 'Normal' };
  toolbarOptions = ['Add Invoice', 'Delete', 'Cancel', 'Search'];
  @ViewChild('grid') grid: GridComponent;
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

  constructor(
    private invoiceService: InvoiceService,
    private alertify: AlertifyService,
    private companyService: CompanyService,
    private containerService: ContainerService,
    private router: Router,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.clearForm();
    this.getAll();
    this.getAllContainer();
    this.getAllCompany();
  }
  clearForm() {
    this.invoice = {} as Invoice;
    this.containerID = null;
    this.companyID = null;
    this.status = null;
  }
  // api
  getAll() {
    this.invoiceService.getAllInvoice().subscribe(res => {
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


  create() {
    this.invoiceService.create(this.invoice).subscribe(() => {
      this.alertify.success('Add Action Successfully');
      this.getAll();
      this.clearForm();
    });
  }

  update() {
    this.invoiceService.update(this.invoice.id, this.invoice).subscribe(() => {
      this.alertify.success('Add Action Successfully');
      // this.modalReference.close() ;
      this.getAll();
      this.clearForm();
    });
  }
  delete(id) {
    this.alertify.confirm('Delete action', 'Are you sure you want to delete this action "' + id + '" ?', () => {
      this.invoiceService.delete(id).subscribe(() => {
        this.getAll();
        this.alertify.success('The action has been deleted');
      }, error => {
        this.alertify.error('Failed to delete the action');
      });
    });
  }
  // end api

  // grid event
  recordDoubleClick(args) {
    this.goToEdit(args.rowData);

  }
  toolbarClick(args): void {
    switch (args.item.text) {
      /* tslint:disable */
      case 'Excel Export':
        this.grid.excelExport();
        break;
      case 'Add Invoice':
        this.goToAdd();
        break;
      /* tslint:enable */
      default:
        break;
    }
  }
  actionBegin(args) {
    if (args.requestType === 'save') {
      if (args.action === 'add') {

        this.invoice = args.data as Invoice;
        this.invoice.id = 0;
        this.invoice.containerID = this.containerID;
        this.invoice.companyID = this.companyID;
        this.invoice.statusCode = this.status;
        this.create();
      }
      if (args.action === 'edit') {
        this.invoice = args.data as Invoice;
        this.invoice.containerID = this.containerID;
        this.invoice.containerID = this.containerID;
        this.invoice.companyID = this.companyID;
        this.invoice.statusCode = this.status;
        this.update();
      }
    }
    if (args.requestType === 'delete') {
      this.delete(args.data[0].id);
    }
  }
  actionComplete(e: any): void {
    // if (e.requestType === 'add') {
    //   (e.form.elements.namedItem('userName') as HTMLInputElement).focus();
    //   (e.form.elements.namedItem('id') as HTMLInputElement).disabled = true;
    // }
  }
  // end event
  NO(index) {
    return (this.grid.pageSettings.currentPage - 1) * this.pageSettings.pageSize + Number(index) + 1;
  }
  onChangeStatus(args) {
    this.status = args.value;
  }
  onChangeCompany(args) {
    this.companyID = args.itemData.id;
  }
  onChangeContainer(args) {
    this.containerID = args.itemData.id;
  }

  goToEdit(invoice): void {
    this.router.navigate(['/tracking/invoice/edit/', invoice.id]);
  }

  goToAdd(): void {
    this.router.navigate(['/tracking/invoice/add']);
  }
}


