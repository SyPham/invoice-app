import { Container } from './../../../shared/_models/container';
import { ContainerService } from './../../../shared/_services/container.service';
import { AlertifyService } from './../../../shared/_services/alertify.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import {  AlertifyLabel, EJ2GRID, Message } from './../../../shared/_constants';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {
  container: Container;
  data: any;
  editSettings = { showDeleteConfirmDialog: false, allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal' };
  toolbarOptions = ['Add', 'Edit', 'Delete', 'Cancel', 'Search', 'ColumnChooser'];
  @ViewChild('grid') grid: GridComponent;
  pageSettings = { pageCount: 20, pageSizes: true, pageSize: 10 };
  fieldsContainerType: object = { text: 'name', value: 'name' };
  filterSettings = { type: 'Excel' };
  containerTypeData: object;
  containerTypeID: any;
  constructor(
    private containerService: ContainerService,
    private alertify: AlertifyService,
  ) { }

  ngOnInit() {
    this.container = {} as Container;
    this.getAll();
  }
  // api
  getAll() {
    this.containerService.getAllContainer().subscribe(res => {
      this.data = res;
    });
  }

  create() {
    this.containerService.create(this.container).subscribe(() => {
      this.alertify.success(Message.CREATE_SUCCECCFULLY);
      this.getAll();
      this.container = {} as Container;
    });
  }

  update() {
    this.containerService.update(this.container.id, this.container).subscribe(() => {
      this.alertify.success(Message.UPDATE_SUCCECCFULLY);
      this.getAll();
      this.container = {} as Container;
    });
  }
  delete(id) {
    this.alertify.confirm(AlertifyLabel.CONFIRM_DELETE_TITLE, AlertifyLabel.CONFIRM_MESSAGE, () => {
      this.containerService.delete(id).subscribe(() => {
        this.getAll();
        this.alertify.success(Message.DELETE_SUCCECCFULLY);
      }, error => {
        this.alertify.error(Message.DELETE_FAILED);
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
    if (args.requestType === EJ2GRID.REQUEST_TYPE_SAVE) {
      if (args.action === EJ2GRID.ACTION_ADD) {
        this.container = args.data as Container;
        this.container.id = 0;
        this.create();
      }
      if (args.action === EJ2GRID.ACTION_EDIT) {
        this.container = args.data as Container;
        this.update();
      }
    }
    if (args.requestType === EJ2GRID.REQUEST_TYPE_DELETE) {
      this.delete(args.data[0].id);
    }
  }
  actionComplete(e: any): void {
  }
  // end event
  NO(index) {
    return (this.grid.pageSettings.currentPage - 1) * this.pageSettings.pageSize + Number(index) + 1;
  }
  onChangeContainerType(args) {
    this.containerTypeID = args.itemData.id;
  }
}
