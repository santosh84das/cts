import { Component, OnInit } from '@angular/core';
import { ActionButtonConfig, DynamicTable, DynamicTableQueryParameters } from 'mh-prime-dynamic-table';
import { GetVendorStampRequisition } from 'src/app/core/models/stamp';
import { StampRequisitionService } from 'src/app/core/services/stamp/stamp-requisition.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-payment-processing',
  templateUrl: './payment-processing.component.html',
  styleUrls: ['./payment-processing.component.scss']
})
export class PaymentProcessingComponent implements OnInit {

  registerGRNModal: boolean = false
  vendorStampRequisitionId: number = 0
  GRNNo: string = ""
  tableActionButton: ActionButtonConfig[] = [];
  tableData!: DynamicTable<GetVendorStampRequisition>;
  tableQueryParameters!: DynamicTableQueryParameters | any;
  constructor(private stampRequisitionService: StampRequisitionService,
    private toastService: ToastService) { }

  ngOnInit(): void {
    this.tableQueryParameters = {
      pageSize: 10,
      pageIndex: 0,
    };
    this.tableActionButton = [
      // {
      //   buttonIdentifier: 'reject',
      //   class: 'p-button-danger p-button-sm',
      //   icon: 'pi pi-times',
      //   lable: 'Reject',
      // },
      {
        buttonIdentifier: 'edit',
        class: 'p-button-warning p-button-sm',
        icon: 'pi pi-file-edit',
        lable: 'Register GRN',
      },
    ];
    this.getAllWaitingForTOVerificationRequisitions()
  }

  handleButtonClick($event: any) {
    switch ($event.buttonIdentifier) {
      case 'reject':
        break;
      case 'edit':
        this.registerGRNModal = true
        this.vendorStampRequisitionId = $event.rowData.vendorStampRequisitionId
        break;
    }
  }

  getAllWaitingForTOVerificationRequisitions() {
    this.stampRequisitionService.getAllWaitingForTOVerification(this.tableQueryParameters).subscribe((response) => {
      if (response.apiResponseStatus == 1) {
        this.tableData = response.result
      } else {
        this.toastService.showError(response.message)
      }
    })
  }


  registerGRNNo() {
    if (this.GRNNo && this.vendorStampRequisitionId) {
      this.stampRequisitionService.registerGRNNo({ vendorStampRequisitionId: this.vendorStampRequisitionId, GRNNo: this.GRNNo }).subscribe((response) => {
        if (response.apiResponseStatus == 1) {
          this.toastService.showSuccess(response.message)
        } else {
          this.toastService.showError(response.message)
        }
      })
    } else {
      this.toastService.showWarning("Requisition Id or GRNNo is missing")
    }
  }

  GRNNoSelected($event: any) {
    this.GRNNo = $event
  }
}
