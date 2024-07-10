import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActionButtonConfig, DynamicTable, DynamicTableQueryParameters } from 'mh-prime-dynamic-table';
import { Status } from 'src/app/core/enum/stampIndentStatusEnum';
import { AddStampIndent, GetStampIndents } from 'src/app/core/models/stamp';
import { StampIndentService } from 'src/app/core/services/stamp/stamp-indent.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { convertDate } from 'src/utils/dateConversion';

interface expandedRows {
  [key: string]: boolean;
}

@Component({
  selector: 'app-manual-ppo-receipt',
  templateUrl: './manual-ppo-receipt.component.html',
  styleUrls: ['./manual-ppo-receipt.component.scss']
})
export class ManualPpoReceiptComponent implements OnInit {
  treasuryReceiptId!: number;
  ppoNo!: number;
  mobileNo!: number;
  displayInsertModal: boolean = false;
  manualPpoForm: FormGroup = this.fb.group({
    mobileNo: [null, Validators.required],
    ppoNo: [null, Validators.required],
    treasuryReceiptId: [null, Validators.required]
  });
  tableQueryParameters: DynamicTableQueryParameters = {
    pageSize: 10,
    pageIndex: 0,
    filterParameters: [], 
    sortParameters: { field: '', order: '' } 
  };
  tableActionButton: ActionButtonConfig[] = [];
  tableData: DynamicTable<GetStampIndents> | undefined;
  modalData: any[] = [];  // Add this line

  constructor(
    private toastService: ToastService,
    private stampIndentService: StampIndentService,
    private fb: FormBuilder
  ) { }

  @Output() StampCombinationSelected = new EventEmitter<any>();

  ngOnInit(): void {
    this.initializeForm();
    this.getAllStampIndents();
  }

  showInsertDialog() {
    this.displayInsertModal = true;
  }

  handleButtonClick($event: any): void {
    if ($event && $event.buttonType === 'customButton') {
      console.log('Custom button clicked!');
    } else {
      console.log('Unhandled button click event');
      this.modalData = [this.manualPpoForm.value];
       
    }
  }

  initializeForm(): void {
    this.manualPpoForm = this.fb.group({
      pensionerName: ['', Validators.required],
      dateOfCommencementOfPensionFamilyPension: ['', Validators.required],
      dateOfReceipt: ['', Validators.required],
      ppoIssuedBy: ['', Validators.required],
      type: ['', Validators.required],
      status: ['', Validators.required],
      select: ['', Validators.required],
      mobileNo: [null, Validators.required],
      ppoNo: [null, Validators.required],
      treasuryReceiptId: [null, Validators.required]
    });
  }

  addStampIndent() {
    this.displayInsertModal = false;
    this.modalData = [this.manualPpoForm.value];  // Update modalData with the form values
  }

  getAllStampIndents() {
    this.stampIndentService.getAllStampIndents(this.tableQueryParameters)
      .subscribe((response) => {
        if (response.apiResponseStatus === 1) {
          response.result.data.forEach((item: GetStampIndents) => {
            item.createdAt = convertDate(item.createdAt);
            item.memoDate = convertDate(item.memoDate);
            item.status = Status[item.status as keyof typeof Status].toString();
          });
          this.tableData = response.result;
        } else {
          this.toastService.showAlert(response.message, response.apiResponseStatus);
        }
      });
  }
}