import { Component, OnInit } from '@angular/core';
import { ActionButtonConfig, DynamicTable, DynamicTableQueryParameters } from 'mh-prime-dynamic-table';
import { GetVendorStampRequisition } from 'src/app/core/models/stamp';
import { StampRequisitionService } from 'src/app/core/services/stamp/stamp-requisition.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-stamp-requisition',
  templateUrl: './stamp-requisition.component.html',
  styleUrls: ['./stamp-requisition.component.scss']
})
export class StampRequisitionComponent implements OnInit {

  tableActionButton: ActionButtonConfig[] = [];
  tableData!: DynamicTable<GetVendorStampRequisition>;
  tableQueryParameters!: DynamicTableQueryParameters | any;
  constructor(private stampRequisitionService: StampRequisitionService,
    private toastService: ToastService,) { }

  ngOnInit(): void {
    this.tableQueryParameters = {
      pageSize: 10,
      pageIndex: 0,
    };

    this.getAllStampRequisitions()
  }

  getAllStampRequisitions() {
    this.stampRequisitionService
      .getAllStampRequisitions(this.tableQueryParameters)
      .subscribe((response) => {
        if (response.apiResponseStatus == 1) {
          // response.result.data.map((item: any) => {
          //   item.createdAt = convertDate(item.createdAt);
          // });
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

  }

}
