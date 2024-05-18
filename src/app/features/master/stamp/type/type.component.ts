import { Component, OnInit } from '@angular/core';
import { ActionButtonConfig, DynamicTable, DynamicTableQueryParameters } from 'src/app/core/models/dynamic-table';
import { tokenDetails } from 'src/app/core/models/token';
import { TypeService } from 'src/app/core/services/stamp/type.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.scss']
})
export class TypeComponent implements OnInit {

  tableActionButton: ActionButtonConfig[] = [];
  tableData!: DynamicTable<tokenDetails>;
  tableQueryParameters!: DynamicTableQueryParameters | any;
  constructor(
    private TypeService: TypeService,
    private toastService: ToastService,
  ) { }

  ngOnInit(): void {
    this.tableActionButton = [
      {
        buttonIdentifier: 'edit',
        class: 'p-button-warning p-button-sm',
        icon: 'pi pi-file-edit',
        lable: 'Edit',
      },
      {
        buttonIdentifier: 'delete',
        class: 'p-button-danger p-button-sm',
        icon: 'pi pi-file-delete',
        lable: 'Delete',
      },
    ];
    this.tableQueryParameters = {
      pageSize: 10,
      pageIndex: 0,
    };
    this.getAllStampTypes();
  }

  getAllStampTypes() {
    this.TypeService
      .getStampTypeList(this.tableQueryParameters)
      .subscribe((response) => {
        if (response.apiResponseStatus == 1) {
          this.tableData = response.result;
        } else {
          this.toastService.showAlert(
            response.message,
            response.apiResponseStatus
          );
        }
      });
  }

}
