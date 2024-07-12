import { Component, OnInit } from '@angular/core';
import { StampRequisitionStatusEnum } from 'src/app/core/enum/stampRequisitionEnum';
import { ActionButtonConfig, DynamicTable, DynamicTableQueryParameters } from 'src/app/core/models/dynamic-table';
import { StampRequisitionService } from 'src/app/core/services/stamp/stamp-requisition.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-stamp-requisition-approval',
  templateUrl: './stamp-requisition-approval.component.html',
  styleUrls: ['./stamp-requisition-approval.component.scss']
})
export class StampRequisitionApprovalComponent implements OnInit {

  tableActionButton: ActionButtonConfig[] = [];
  tableData!: DynamicTable<any>;
  tableQueryParameters!: DynamicTableQueryParameters | any;
  constructor(private stampRequisitionService: StampRequisitionService, private toastService: ToastService) { }

  ngOnInit(): void {
    this.tableQueryParameters = {
      pageSize: 10,
      pageIndex: 0,
    };
    this.tableActionButton = [
      {
        buttonIdentifier: 'reject',
        class: 'p-button-danger p-button-sm',
        icon: 'pi pi-times',
        lable: 'Reject',
        renderButton: (rowData) => {
          return rowData.status == StampRequisitionStatusEnum.ForwardedToTreasuryOfficer
        }
      },
      {
        buttonIdentifier: 'approve',
        class: 'p-button-success p-button-sm',
        icon: 'pi pi-check-circle',
        lable: 'Approve',
        renderButton: (rowData) => {
          return rowData.status == StampRequisitionStatusEnum.WaitingForPaymentVerification
        }
      },
      {
        buttonIdentifier: 'edit',
        class: 'p-button-warning p-button-sm',
        icon: 'pi pi-file-edit',
        lable: 'Edit & Approve',
        renderButton: (rowData) => {
          return rowData.status == StampRequisitionStatusEnum.ForwardedToTreasuryOfficer
        }
      },
    ];
    this.getAllApprovedByClerkRequisitionsOrForwardedToTO()
  }

  handleButtonClick($event: any) {
    switch ($event.buttonIdentifier) {
      case 'reject':
      this.stampRequisitionService.rejectedByTO($event.rowData.vendorStampRequisitionId).subscribe((response) => {
        if (response.apiResponseStatus == 1) {
          this.toastService.showSuccess(response.message)
        } else {
          this.toastService.showError(response.message)
        }
      })
        break;
      case 'approve':
     
        break;
    }
  }
  getAllApprovedByClerkRequisitionsOrForwardedToTO() {
    this.stampRequisitionService.getAllRequisitionsForwardedToTO(this.tableQueryParameters).subscribe((response) => {
      if (response.apiResponseStatus == 1) {
        this.tableData = response.result;
      } else {
        this.toastService.showError(response.message)
      }
    })
  }
}
