import { Invoice } from './../../../../shared/_models/invoice';
import { CompanyService } from './../../../../shared/_services/company.service';
import { InvoiceService } from './../../../../shared/_services/invoice.service';
import { AlertifyService } from './../../../../shared/_services/alertify.service';
import { ContainerService } from './../../../../shared/_services/container.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from './../../../../shared/_constants';

@Component({
  selector: 'app-invoice-add',
  templateUrl: './invoice-add.component.html',
  styleUrls: ['./invoice-add.component.scss']
})
export class InvoiceAddComponent implements OnInit {
  invoice = {} as any;
  invoiceID: any;
  containerData: object;
  companyData: object;
  statusData = ['Draft DOE', 'Pending Shipment', 'Done'];

  containerID: any;
  companyID: any;
  status: any;

  fieldsCompany: object = { text: 'name', value: 'id' };
  fieldsContainer: object = { text: 'containerNo', value: 'id' };

  constructor(
    private invoiceService: InvoiceService,
    private alertify: AlertifyService,
    private containerService: ContainerService,
    private companyService: CompanyService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.invoice = {
      id: 0,
      invoiceNo: '',
      other1: '',
      other2: '',
      carrier: '',
      description: '',
      vesselName: '',
      statusCode: '',
      containerID: null,
      containerNo: '',
      blno: '',
      companyID: null,
      eta: null,
      etd: null
    };

    this.getAllContainer();
    this.getAllCompany();
  }
  validator() {
    if (this.invoice.companyID === undefined) {
      this.alertify.warning('Please select a company!');
      return false;
    }
    if (this.invoice.invoiceNo === '') {
      this.alertify.warning('Please enter invoice No.!');
      return false;
    }
    if (this.invoice.containerID === undefined) {
      this.alertify.warning('Please select a container!');
      return false;
    }
    if (this.invoice.statusCode === undefined || this.invoice.statusCode === '') {
      this.alertify.warning('Please select a status!');
      return false;
    }
    return true;
  }
  clearForm() {
    this.invoice = {} as Invoice;
    this.containerID = null;
    this.companyID = null;
    this.status = null;
  }
  getAllContainer() {
    this.containerService.getAllContainer().subscribe(res => {
      this.containerData = res;
    });
  }
  getAllCompany() {
    this.companyService.getAllCompany().subscribe(res => {
      this.companyData = res;
    });
  }

  create() {
    this.invoice.containerID = this.containerID;
    this.invoice.companyID = this.companyID;
    this.invoice.statusCode = this.status;
    if (this.validator()) {
      this.invoiceService.create(this.invoice).subscribe(() => {
        this.alertify.success(Message.CREATE_SUCCECCFULLY);
        this.back();
        this.clearForm();
      }, error => this.alertify.error(Message.CREATE_FAILED));
    }
  }

  back(): void {
    this.router.navigateByUrl('/tracking/invoice');
  }

  onChangeStatus(args) {
    this.status = args.value;
    this.invoice.statusCode = this.status;
  }
  onChangeCompany(args) {
    this.companyID = args.itemData.id;
    this.invoice.companyID = this.companyID;
  }
  onChangeContainer(args) {
    this.containerID = args.itemData.id;
    this.invoice.containerID = this.containerID;
  }
}

