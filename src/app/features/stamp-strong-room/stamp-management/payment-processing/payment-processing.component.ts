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
  printModal: boolean = false
  vendorStampRequisitionId: number = 0
  GRNNo: number = 0
  tableActionButton: ActionButtonConfig[] = [];
  tableData!: DynamicTable<GetVendorStampRequisition>;
  tableQueryParameters!: DynamicTableQueryParameters | any;
  printData: any
  constructor(private stampRequisitionService: StampRequisitionService,
    private toastService: ToastService) { }

  ngOnInit(): void {
    this.tableQueryParameters = {
      pageSize: 10,
      pageIndex: 0,
    };
    this.tableActionButton = [
      {
        buttonIdentifier: 'print',
        class: 'p-button-info p-button-sm',
        icon: 'pi pi-print',
        lable: 'Print',
      },
      {
        buttonIdentifier: 'edit',
        class: 'p-button-warning p-button-sm',
        icon: 'pi pi-file-edit',
        lable: 'Register GRN',
      },
    ];
    this.getAllRequisitionsWaitingForPayment()
  }

  handleButtonClick($event: any) {
    switch ($event.buttonIdentifier) {
      case 'print':
        this.getDataForPrint($event.rowData.vendorStampRequisitionId)
        break;
      case 'edit':
        this.registerGRNModal = true
        this.vendorStampRequisitionId = $event.rowData.vendorStampRequisitionId
        break;
    }
  }

  getAllRequisitionsWaitingForPayment() {
    this.stampRequisitionService.getAllRequisitionsWaitingForPayment(this.tableQueryParameters).subscribe((response) => {
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
          this.getAllRequisitionsWaitingForPayment()
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
  getDataForPrint(id: number) {
    this.stampRequisitionService.printtr7(9).subscribe((response) => {
      if (response.apiResponseStatus == 1) {
        this.printData = {
          raisedToTreasury: response.result.raisedToTreasury,
          hoa: response.result.hoa,
          detailHead: response.result.detailHead,
          amount: response.result.amount,
          vendorName: response.result.vendorName,
          vendorAddress: response.result.vendorAddress,
          treasuryName: response.result.treasuryName
        }
        this.printModal = true
      } else {
        this.toastService.showError(response.message)
      }
    })
  }
}
