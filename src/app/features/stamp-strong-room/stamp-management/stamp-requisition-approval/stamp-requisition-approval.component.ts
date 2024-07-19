import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StampRequisitionStatusEnum } from 'src/app/core/enum/stampRequisitionEnum';
import { ActionButtonConfig, DynamicTable, DynamicTableQueryParameters } from 'src/app/core/models/dynamic-table';
import { ApprovedByTO } from 'src/app/core/models/stamp';
import { StampRequisitionService } from 'src/app/core/services/stamp/stamp-requisition.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-stamp-requisition-approval',
  templateUrl: './stamp-requisition-approval.component.html',
  styleUrls: ['./stamp-requisition-approval.component.scss']
})
export class StampRequisitionApprovalComponent implements OnInit {

  id: number = 0
  sheet: number = 0
  label: number = 0
  discountAmount: number = 0
  denomination: number = 0
  noOfLabelsPerSheet: number = 0
  taxAmount: number = 0.1 * this.discountAmount
  quantity: number = (this.noOfLabelsPerSheet * this.sheet) + this.label
  amount: number = this.quantity * this.denomination
  challanAmount: number = this.amount - this.discountAmount + this.taxAmount;
  noOfSheets: number = 0
  modal: boolean = false
  listType: string = 'forwarded'
  tableActionButton: ActionButtonConfig[] = [];
  tableData!: DynamicTable<any>;
  tableQueryParameters!: DynamicTableQueryParameters | any;
  approveByTOForm!: FormGroup
  approveByTOPayload!: ApprovedByTO

  constructor(private stampRequisitionService: StampRequisitionService, private toastService: ToastService, private fb: FormBuilder,) { }

  ngOnInit(): void {
    this.initialozeForm()
    this.changeDynamicTable('forwarded')
  }

  initialozeForm() {
    this.approveByTOForm = this.fb.group({
      sheet: [0, [Validators.required, Validators.min(0)]],
      label: [0, [Validators.required, Validators.min(0)]],
    });
  }
  handleButtonClick($event: any) {
    switch ($event.buttonIdentifier) {
      case 'reject':
        this.stampRequisitionService.rejectedByTO($event.rowData.vendorStampRequisitionId).subscribe((response) => {
          if (response.apiResponseStatus == 1) {
            this.toastService.showSuccess(response.message)
            this.getAllApprovedByClerkRequisitionsOrForwardedToTO()
          } else {
            this.toastService.showError(response.message)
          }
        })
        break;
      case 'edit':
        this.modal = true
        this.id = $event.rowData.vendorRequisitionStagingId
        this.sheet = $event.rowData.sheet
        this.label = $event.rowData.label
        break;
    }
  }
  getAllApprovedByClerkRequisitionsOrForwardedToTO() {
    this.stampRequisitionService.getAllRequisitionsForwardedToTOForApproval(this.tableQueryParameters).subscribe((response) => {
      if (response.apiResponseStatus == 1) {
        this.tableData = response.result;
      } else {
        this.toastService.showError(response.message)
      }
    })
  }

  getAllStampRequisitionWaitingForPaymentVerificatonByTO() {
    this.stampRequisitionService.getAllStampRequisitionWaitingForPaymentVerificatonByTO(this.tableQueryParameters).subscribe((response) => {
      if (response.apiResponseStatus == 1) {
        this.tableData = response.result
      } else {
        this.toastService.showError(response.message)
      }
    })
  }

  approveByTO() {
    if (this.approveByTOForm.valid) {
      this.approveByTOPayload = {
        vendorRequisitionStagingId: this.id,
        labelByTo: this.approveByTOForm.value.label,
        sheetByTo: this.approveByTOForm.value.sheet,
        challanAmount: 100,
        discountedAmount: 100,
        taxAmount: 100
      }
      this.stampRequisitionService.approveByTO(this.approveByTOPayload).subscribe((response) => {
        if (response.apiResponseStatus == 1) {
          this.toastService.showSuccess(response.message)
          this.getAllApprovedByClerkRequisitionsOrForwardedToTO()
          this.approveByTOForm.reset()
          this.modal = false
        } else {
          this.toastService.showError(response.message)
        }
      })
    } else {
      this.toastService.showWarning("Please fill all the fields.")
    }
  }

  changeDynamicTable(listType: string) {
    this.listType = listType;
    this.tableQueryParameters = {
      pageSize: 10,
      pageIndex: 0,
    };
    if (this.listType === 'forwarded') {
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
    } else if (this.listType === 'waitingPaymentVerification') {

      this.tableActionButton = [
        {
          buttonIdentifier: 'approve',
          class: 'p-button-success p-button-sm',
          icon: 'pi pi-check-circle',
          lable: 'Approve',
          renderButton: (rowData) => {
            return rowData.status == StampRequisitionStatusEnum.WaitingForPaymentVerification
          }
        },
      ];
      this.getAllStampRequisitionWaitingForPaymentVerificatonByTO()
    }
  }

  labelSelected($event: any) {

  }

  sheetSelected($event: any) {

  }
}
