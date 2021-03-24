import { RoleService } from './../../../shared/_services/role.service';
import { AlertifyService } from './../../../shared/_services/alertify.service';
import { AccountService } from './../../../shared/_services/account.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { GridComponent } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  account: any;
  data: any;
  editSettings = { showDeleteConfirmDialog: false, allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal' };
  toolbarOptions = ['Add', 'Edit', 'Delete', 'Cancel', 'Search'];
  @ViewChild('grid') grid: GridComponent;
  pageSettings = { pageCount: 20, pageSizes: true, pageSize: 10 };
  fieldsAccountType: object = { text: 'name', value: 'name' };
  filterSettings = { type: 'Excel' };
  roleData: object;
  roleID: any;
  id: any;
  constructor(
    private accountService: AccountService,
    private roleService: RoleService,
    private alertify: AlertifyService,
  ) { }

  ngOnInit() {
    this.account = {};
    this.getAll();
    this.getAllRole();
  }
  // api
  getAll() {
    this.accountService.getAllAccount().subscribe(res => {
      this.data = res;
    });
  }
  getAllRole() {
    this.roleService.getAllRole().subscribe(res => {
      this.roleData = res;
    });
  }

  create() {
    this.accountService.create(this.account).subscribe(() => {
      this.alertify.success('Add Action Successfully');
      this.getAll();
      this.account = {};
      this.id = null;
      this.roleID = null;
    });
  }

  update() {
    this.accountService.update(this.id, this.account).subscribe(() => {
      this.alertify.success('Add Action Successfully');
      // this.modalReference.close() ;
      this.getAll();
      this.account = {};
      this.id = null;
      this.roleID = null;
    });
  }
  delete(id) {
    this.alertify.confirm('Delete action', 'Are you sure you want to delete this action "' + id + '" ?', () => {
      this.accountService.delete(id).subscribe(() => {
        this.getAll();
        this.alertify.success('The action has been deleted');
      }, error => {
        this.alertify.error('Failed to delete the action');
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
        this.account.id = 0;
        this.account.name = args.data.name;
        this.account.code = args.data.code;
        this.account.roleID = this.roleID;
        this.create();
      }
      if (args.action === 'edit') {
        this.account.id = args.data.id;
        this.id = args.data.id;
        this.account.name = args.data.name;
        this.account.code = args.data.code;
        this.account.roleID = this.roleID;
        this.update();
      }
    }
    if (args.requestType === 'delete') {
      this.delete(args.data[0].id);
    }
  }
  actionComplete(e: any): void {
    if (e.requestType === 'add') {
      (e.form.elements.namedItem('userName') as HTMLInputElement).focus();
      (e.form.elements.namedItem('id') as HTMLInputElement).disabled = true;
    }
  }
  // end event
  NO(index) {
    return (this.grid.pageSettings.currentPage - 1) * this.pageSettings.pageSize + Number(index) + 1;
  }
  onChangeRole(args) {
    this.roleID = args.itemData.id;
  }
}

