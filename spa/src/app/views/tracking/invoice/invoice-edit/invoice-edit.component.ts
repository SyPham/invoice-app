import { Invoice } from './../../../../shared/_models/invoice';
import { CompanyService } from './../../../../shared/_services/company.service';
import { InvoiceService } from './../../../../shared/_services/invoice.service';
import { AlertifyService } from './../../../../shared/_services/alertify.service';
import { ContainerService } from './../../../../shared/_services/container.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from './../../../../shared/_constants';

@Component({
  selector: 'app-invoice-edit',
  templateUrl: './invoice-edit.component.html',
  styleUrls: ['./invoice-edit.component.scss']
})
export class InvoiceEditComponent implements OnInit {
  invoice: Invoice = {} as Invoice;
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
    this.invoiceID = this.route.snapshot.params.invoiceID;

    this.getById();
    this.getAllContainer();
    this.getAllCompany();
  }
  clearForm() {
    this.invoice = {} as Invoice;
    this.containerID = null;
    this.companyID = null;
    this.status = null;
  }
  getById() {
    this.invoiceService.getById(this.invoiceID).subscribe((res: Invoice) => {
      this.invoice = res;
      this.containerID = this.invoice.containerID;
      this.companyID = this.invoice.companyID;
      this.status = this.invoice.statusCode;
      console.log(res);
    });
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
  update() {
    this.invoice.containerID = this.containerID;
    this.invoice.companyID = this.companyID;
    this.invoice.statusCode = this.status;
    this.invoiceService.update(this.invoice.id, this.invoice).subscribe(() => {
      this.alertify.success(Message.UPDATE_SUCCECCFULLY);
      this.back();
    }, error => this.alertify.success(Message.UPDATE_FAILED));
  }
  back(): void {
    this.router.navigateByUrl('/tracking/invoice');
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
}
