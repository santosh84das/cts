import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActionButtonConfig, DynamicTable, DynamicTableQueryParameters } from 'src/app/core/models/dynamic-table';
import { tokenDetails } from 'src/app/core/models/token';
import { TypeService } from 'src/app/core/services/stamp/type.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { convertDate } from 'src/utils/dateConversion';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.scss']
})
export class TypeComponent implements OnInit {

  TypeEntryForm!: FormGroup
  displayInsertModal: boolean | undefined;
  tableActionButton: ActionButtonConfig[] = [];
  tableData!: DynamicTable<tokenDetails>;
  tableQueryParameters!: DynamicTableQueryParameters | any;
  constructor(
    private TypeService: TypeService,
    private toastService: ToastService,
  ) { }

  ngOnInit(): void {
    this.tableActionButton = [
      // {
      //   buttonIdentifier: 'edit',
      //   class: 'p-button-warning p-button-sm',
      //   icon: 'pi pi-file-edit',
      //   lable: 'Edit',
      // },
      {
        buttonIdentifier: 'delete',
        class: 'p-button-danger p-button-sm',
        icon: 'pi pi-trash',
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
            response.result.data.map((item:any) => {
            item.isActive = item.isActive ? "Yes" : "No"
            item.createdAt = convertDate(item.createdAt)
          })
          this.tableData = response.result;
        } else {
          this.toastService.showAlert(
            response.message,
            response.apiResponseStatus
          );
        }
      });
  }

  handleButtonClick($event: any) {
    this.TypeService.deleteStampType($event.rowData.denominationId)
      .subscribe((response) => {
        response.apiResponseStatus == 1 ? this.getAllStampTypes() : this.toastService.showAlert(
          response.message,
          response.apiResponseStatus
        );

      });
  }

  showInsertDialog() {
    this.displayInsertModal = true;
  }
}
