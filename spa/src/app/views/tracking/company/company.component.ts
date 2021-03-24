import { AlertifyService } from './../../../shared/_services/alertify.service';
import { CompanyService } from './../../../shared/_services/company.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { GridComponent } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  company: any;
  data: any;
  editSettings = { showDeleteConfirmDialog: false, allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal' };
  toolbarOptions = ['Add', 'Edit', 'Delete', 'Cancel', 'Search'];
  @ViewChild('grid') grid: GridComponent;
  pageSettings = { pageCount: 20, pageSizes: true, pageSize: 10 };
  fieldsCompanyType: object = { text: 'name', value: 'name' };
  filterSettings = { type: 'Excel' };
  companyTypeData: object;
  companyTypeID: any;
  id: any;
  constructor(
    private companyService: CompanyService,
    private alertify: AlertifyService,
  ) { }

  ngOnInit() {
    this.company = {};
    this.getAll();
  }
  // api
  getAll() {
    this.companyService.getAllCompany().subscribe(res => {
      this.data = res;
    });
  }

  create() {
    this.companyService.create(this.company).subscribe(() => {
      this.alertify.success('Add Action Successfully');
      this.getAll();
      this.company = {};
      this.id = null;
    }, error => {
      this.grid.refresh();
      this.alertify.error('Failed to update the record');
    });
  }

  update() {
    this.companyService.update(this.id, this.company).subscribe(() => {
      this.alertify.success('Add Action Successfully');
      // this.modalReference.close() ;
      this.getAll();
      this.company = {};
      this.id = null;
    }, error => {
      this.grid.refresh();
      this.alertify.error('Failed to update the record');
    });
  }
  delete(id) {
    this.alertify.confirm('Delete action', 'Are you sure you want to delete this action "' + id + '" ?', () => {
      this.companyService.delete(id).subscribe(() => {
        this.getAll();
        this.alertify.success('The action has been deleted');
      }, error => {
        this.grid.refresh();
        this.alertify.error('Failed to delete the record');
      });
    });
  }
  // end api

  // grid event
  toolbarClick(args): void {
    switch (args.item.text) {
      /* tslint:disable */
      case 'Excel Export':
        this.grid.excelExport();
        break;
      /* tslint:enable */
      default:
        break;
    }
  }
  actionBegin(args) {
    if (args.requestType === 'save') {
      if (args.action === 'add') {
        this.company.id = 0;
        this.company.name = args.data.name;
        this.company.code = args.data.code;
        this.create();
      }
      if (args.action === 'edit') {
        this.company.id = args.data.id;
        this.id = args.data.id;
        this.company.name = args.data.name;
        this.company.code = args.data.code;
        this.update();
      }
    }
    if (args.requestType === 'delete') {
      this.delete(args.data[0].id);
    }
  }
  actionComplete(e: any): void {
    if (e.requestType === 'add') {
      (e.form.elements.namedItem('name') as HTMLInputElement).focus();
      (e.form.elements.namedItem('id') as HTMLInputElement).disabled = true;
    }
  }
  // end event
  NO(index) {
    return (this.grid.pageSettings.currentPage - 1) * this.pageSettings.pageSize + Number(index) + 1;
  }
  onChangeCompanyType(args) {
    this.companyTypeID = args.itemData.id;
  }
}
