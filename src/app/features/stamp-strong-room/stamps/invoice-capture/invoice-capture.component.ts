import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActionButtonConfig, DynamicTable, DynamicTableQueryParameters } from 'mh-prime-dynamic-table';
import { GetStampInvoices } from 'src/app/core/models/stamp';
import { StampIndentService } from 'src/app/core/services/stamp/stamp-indent.service';
import { StampInvoiceService } from 'src/app/core/services/stamp/stamp-invoice.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { Status } from 'src/app/core/enum/stampIndentStatusEnum';
import { convertDate } from 'src/utils/dateConversion';

@Component({
  selector: 'app-invoice-capture',
  templateUrl: './invoice-capture.component.html',
  styleUrls: ['./invoice-capture.component.scss']
})
export class InvoiceCaptureComponent implements OnInit {
  labelPerSheet: number = 0
  denomination: number = 0
  description: string = "Eg: Court fees."
  sheet: number = 0
  label: number = 0
  raisedToTreasuryCode!: string
  quantity: number = (this.labelPerSheet * this.sheet) + this.label
  amount: number = this.quantity * this.denomination
  stamCombinationId!: number
  listType: string = 'indent';
  stampIndentForm!: FormGroup
  displayModifyModal!: boolean
  tableActionButton: ActionButtonConfig[] = [];
  tableData!: DynamicTable<GetStampInvoices>;
  tableQueryParameters!: DynamicTableQueryParameters | any;
  constructor(private stampInvoiceService: StampInvoiceService,
    private toastService: ToastService,
    private stampIndentService: StampIndentService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

    this.tableQueryParameters = {
      pageSize: 10,
      pageIndex: 0,
    };

    this.getAllStampIndents();
    this.changeDynamicTable(this.listType)
  }

  initializeForm(): void {
    this.stampIndentForm = this.fb.group({
      memoNo: ['', Validators.required],
      memoDate: ['', [Validators.required]],
      noOfSheets: ['', [Validators.required, Validators.pattern(/^\d+$/)]], // Validates integer
      noOfLabels: ['', [Validators.required, Validators.pattern(/^\d+$/)]], // Validates integer
      remarks: ['']
    });
  }

  changeDynamicTable(type: string) {
    this.listType = type;
    if (type == 'indent') {
      this.tableActionButton = [
        {
          buttonIdentifier: 'indent-forward',
          class: ' p-button-sm',
          icon: 'pi pi-check',
          lable: 'Froward TO',
        },
        {
          buttonIdentifier: 'indent-approve',
          class: 'p-button-success p-button-sm',
          icon: 'pi pi-check',
          lable: 'Approve',
        },
        {
          buttonIdentifier: 'indent-reject',
          class: 'p-button-danger p-button-sm',
          icon: 'pi pi-times',
          lable: 'Reject',
        },
        {
          buttonIdentifier: 'indent-invoice',
          class: 'p-button-sm',
          icon: 'pi pi-plus',
          lable: 'Invoice',
        },
        {
          buttonIdentifier: 'indent-edit',
          class: 'p-button-warning p-button-sm',
          icon: 'pi pi-file-edit',
          lable: 'Edit',
        },
      ];
      this.tableQueryParameters = {
        pageSize: 10,
        pageIndex: 0,
      };
      this.getAllStampIndents();
    }
    if (type == 'invoice') {
      this.tableActionButton = [

        {
          buttonIdentifier: 'invoice-received',
          class: ' p-button-sm',
          icon: 'pi pi-users',
          lable: 'Received',
        },
        {
          buttonIdentifier: 'invoice-edit',
          class: 'p-button-warning p-button-sm',
          icon: 'pi pi-file-edit',
          lable: 'Edit',
        },
        {
          buttonIdentifier: 'invoice-details',
          class: 'p-button-info p-button-sm',
          icon: 'pi pi-info-circle',
          lable: 'Details',
        },
      ];
      this.tableQueryParameters = {
        pageSize: 10,
        pageIndex: 0,
      };
      this.getAllStampInvoices();
    }
  }

  getAllStampInvoices() {
    this.stampInvoiceService
      .getAllStampInvoice(this.tableQueryParameters)
      .subscribe((response) => {
        console.log(response);
        if (response.apiResponseStatus == 1 || response.apiResponseStatus == 3) {

          response.result.data.map((item: any) => {
            // item.createdAt = convertDate(item.createdAt);
            // item.memoDate = convertDate(item.memoDate);
          });
          this.tableData = response.result;
        } else {
          this.toastService.showAlert(
            response.message,
            response.apiResponseStatus
          );
        }
      });
  }

  getAllStampIndents() {
    this.stampIndentService
      .getAllStampIndents(this.tableQueryParameters)
      .subscribe((response) => {
        if (response.apiResponseStatus == 1 || response.apiResponseStatus == 3) {
          response.result.data.map((item: any) => {
            item.createdAt = convertDate(item.createdAt);
            item.memoDate = convertDate(item.memoDate);
            item.status = Status[item.status]
          });
          this.tableData = response.result;
        } else {
          this.toastService.showAlert(
            response.message,
            response.apiResponseStatus
          );
        }
      });
  }

  modifyStampIndent() {

  }
  handleButtonClick($event: any) {
    switch ($event.buttonIdentifier) {
      case 'indent-approve':
        // this.approveIndent($event.rowData.id);
        break;
      case 'indent-reject':
        // this.rejectIndent($event.rowData.id);
        break;
      case 'indent-edit':
        this.displayModifyModal = true
        break;
      case 'indent-forward':
        // this.frowardIndentTO($event.rowData.id);
        break;
    }
  }

  calcAmountQuantity() {
    this.quantity = (this.labelPerSheet * this.sheet) + this.label
    this.amount = this.quantity * this.denomination
  }

  sheetSelected($event: any) {
    this.sheet = $event
    this.calcAmountQuantity()
  }

  labelSelected($event: any) {
    this.label = $event
    this.calcAmountQuantity()
  }

  onTreasurySelected($event: any) {
    console.log($event);

    this.raisedToTreasuryCode = $event;
  }

  onStampCombinationSelected($event: any) {
    this.stamCombinationId = $event.stampCombinationId
    this.description = $event.description
    this.denomination = $event.denomination
    this.labelPerSheet = $event.noLabelPerSheet
  }
}
