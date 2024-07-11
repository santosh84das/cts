import { Component, OnInit } from '@angular/core';
import { DynamicTable, DynamicTableQueryParameters } from 'mh-prime-dynamic-table/lib/mh-prime-dynamic-table-interface';
import { ActionButtonConfig } from 'src/app/core/models/dynamic-table';
import { StampRequisitionService } from 'src/app/core/services/stamp/stamp-requisition.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-stamp-requisition-staging',
  templateUrl: './stamp-requisition-staging.component.html',
  styleUrls: ['./stamp-requisition-staging.component.scss']
})
export class StampRequisitionStagingComponent implements OnInit {

  listType: string = 'new'
  tableData!: DynamicTable<any>;
  tableActionButton: ActionButtonConfig[] = [];
  tableQueryParameters!: DynamicTableQueryParameters | any;
  constructor(private stampRequisitionService: StampRequisitionService,
    private toastService: ToastService) { }

  ngOnInit(): void {
    this.tableQueryParameters = {
      pageSize: 10,
      pageIndex: 0,
    };

    this.changeDynamicTable(this.listType);
  }

  changeDynamicTable(listType: string) {
    this.listType = listType;
    this.tableQueryParameters = {
      pageSize: 10,
      pageIndex: 0,
    };
    if (this.listType === 'new') {
      this.tableActionButton = [
        {
          buttonIdentifier: 'reject',
          class: 'p-button-danger p-button-sm',
          icon: 'pi pi-times',
          lable: 'Reject',
        },
        {
          buttonIdentifier: 'edit',
          class: 'p-button-warning p-button-sm',
          icon: 'pi pi-file-edit',
          lable: 'Edit & Approve',
        },
      ];
      this.getAllNewRequisitions();
    } else if (this.listType === 'approvedByClerk') {
      console.log(this.listType);
      
      this.tableActionButton = [];
      this.getAllApprovedByClerkRequisitions();
    }
  }

  handleButtonClick($event: any) {
    switch ($event.buttonIdentifier) {
      case 'reject':
      this.stampRequisitionService.rejectedByStampClerk($event.rowData.vendorStampRequisitionId).subscribe((response) => {
        if (response.apiResponseStatus == 1) {
          this.toastService.showSuccess(response.message)
        } else {
          this.toastService.showError(response.message)
        }
      })
        break;
    }
  }

  getAllNewRequisitions() {
    this.stampRequisitionService.newRequisitions(this.tableQueryParameters).subscribe((response) => {
      if (response.apiResponseStatus == 1) {
        this.tableData = response.result;
      } else {
        this.toastService.showError(response.message)
      }
    })
  }
  
  getAllApprovedByClerkRequisitions() {
    this.stampRequisitionService.getAllRequisitionsForwardedToTO(this.tableQueryParameters).subscribe((response) => {
      if (response.apiResponseStatus == 1) {
        this.tableData = response.result;
      } else {
        this.toastService.showError(response.message)
      }
    })
  }

}
