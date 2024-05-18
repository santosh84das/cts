import { Component, OnInit } from '@angular/core';
import { ActionButtonConfig, DynamicTable, DynamicTableQueryParameters } from 'src/app/core/models/dynamic-table';
import { tokenDetails } from 'src/app/core/models/token';
import { ToastService } from 'src/app/core/services/toast.service';
import { LabelService } from 'src/app/core/services/stamp/label.service';
import { convertDate } from 'src/utils/dateConversion';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent implements OnInit {

  tableActionButton: ActionButtonConfig[] = [];
  tableData!: DynamicTable<tokenDetails>;
  tableQueryParameters!: DynamicTableQueryParameters | any;
  constructor(
    private LabelService: LabelService,
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
    this.getAllStampLabels();
  }
  getAllStampLabels() {
    this.LabelService
      .getStampLabelList(this.tableQueryParameters)
      .subscribe((response) => {
        if (response.apiResponseStatus == 1) {
          response.result.data.map((item: any) => {
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
    this.LabelService.deleteStampLabel($event.rowData.labelId)
      .subscribe((response) => {
        response.apiResponseStatus == 1 ? this.getAllStampLabels() : this.toastService.showAlert(
          response.message,
          response.apiResponseStatus
        );

      });
  }
}
