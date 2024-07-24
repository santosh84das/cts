import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActionButtonConfig, DynamicTable, DynamicTableQueryParameters, TableHeader } from 'mh-prime-dynamic-table';
import { Status } from 'src/app/core/enum/stampIndentStatusEnum';
import { manualPpoReceiptEntryDTO } from 'src/app/core/models/manual-ppo-receipt';
import { ManualPpoReceiptService } from 'src/app/core/services/manualPpoReceipt/manual-ppo-receipt.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { convertDate } from 'src/utils/dateConversion';
import { DatePipe } from '@angular/common';
import { SelectItem } from 'primeng/api';

interface expandedRows {
  [key: string]: boolean;
}

@Component({
  selector: 'app-manual-ppo-receipt',
  templateUrl: './manual-ppo-receipt.component.html',
  styleUrls: ['./manual-ppo-receipt.component.scss']
})
export class ManualPpoReceiptComponent implements OnInit {
  expandedRows: expandedRows = {};
  displayInsertModal: boolean = false;
  manualPpoForm!: FormGroup;
  tableQueryParameters: DynamicTableQueryParameters = {
    pageSize: 10,
    pageIndex: 0,
    filterParameters: [],
    sortParameters: { field: '', order: '' }
  };
  tableActionButton: ActionButtonConfig[] = [];
  tableData: DynamicTable<manualPpoReceiptEntryDTO> = { headers: [], data: [], dataCount: 0 }; 
  modalData: manualPpoReceiptEntryDTO[] = [];
  count: number = 0;
  loading: boolean = false;
  treasuryReceiptId!: string;
  manaualPpoPayload!: manualPpoReceiptEntryDTO;
  selectedRowData: manualPpoReceiptEntryDTO | null = null;  
  selectedRow: any;
  ppoIssuedBy: SelectItem[] = [];
  type: SelectItem[] = [];
  selectedDrop: SelectItem = { value: '' };
  

  constructor(
    private datapipe: DatePipe,
    private toastService: ToastService,
    private manualPpoReceiptService: ManualPpoReceiptService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef
  ) { }

  @Output() ManualPpoReceiptCombinationSelected = new EventEmitter<any>();

  ngOnInit(): void {
    this.initializeForm();
    this.ppoIssuedBy = [
      { label: 'AGWB', value: 'A' },
      { label: 'DPPGWG', value: 'D' },
      { label: 'Other', value: 'O' }
    ];

    this.type = [
      { label: 'New PPO', value: 'N' },
      { label: 'Revise PPO', value: 'R' },
      { label: 'PSA Sanction', value: 'P' },
      { label: 'Other', value: 'O' }
    ];
    this.getAllManualPpoReceipt();
  }

  showInsertDialog() {
    this.displayInsertModal = true;
    this.manualPpoForm.reset();
  }

  handleButtonClick($event: any) {
    // Handle button click logic here
  }

  initializeForm(): void {
    this.manualPpoForm = this.fb.group({
      ppoNo: ['', [Validators.required, Validators.maxLength(100)]],
      pensionerName: ['', Validators.maxLength(100)],
      dateOfCommencement: ['', Validators.required],
      mobileNo: ['', [Validators.pattern('^[6-9]\\d{9}$')]],
      receiptDate: ['', Validators.required],
      psaCode: ['', [Validators.required, Validators.pattern('[ADO]')]],
      ppoType: ['', [Validators.required, Validators.pattern('[NRPO]')]]
    });
  }

  clear(table: any) {
    table.clear();
  }

  onGlobalFilter(dt: any, event: Event): void {
    const input = event.target as HTMLInputElement;
    dt.filterGlobal(input.value, 'contains');
  }

  // Add Manual PPO Receipt
  addManualPpoReceipt() {
    if (this.manualPpoForm.valid) {
      const formData = this.manualPpoForm.value;
  
      if (formData.receiptDate && formData.dateOfCommencement) {
        const localDate = new Date(formData.dateOfCommencement);
        const offset = localDate.getTimezoneOffset();
        const adjustedDate = new Date(localDate.getTime() - offset);
        formData.dateOfCommencement = this.datapipe.transform(adjustedDate, 'yyyy-MM-dd');
        formData.receiptDate = this.datapipe.transform(formData.receiptDate, 'yyyy-MM-dd');
      }
  
      console.log('Form Data:', formData);
  
      this.manualPpoReceiptService.addNewManualPpoReceipt(formData).subscribe(
        response => {
          console.log('Form submitted successfully:', response);
          this.getAllManualPpoReceipt();  // Refresh table data
          this.resetForm();  // Reset form fields
          this.displayInsertModal = false;  // Close the dialog
        },
        error => {
          if (error instanceof HttpErrorResponse && error.status === 400) {
            console.error('Error submitting form:', error);
            const errorMessage = error.error.message;
            this.toastService.showError(errorMessage);
          } else {
            console.error('Error submitting form:', error);
            this.toastService.showError('An unexpected error occurred. Please try again.');
          }
        }
      );
    } else {
      console.log('Form is not valid. Cannot submit.');
      console.log(this.manualPpoForm.errors); 
      Object.keys(this.manualPpoForm.controls).forEach(key => {
        const controlErrors = this.manualPpoForm.get(key)!.errors;
        if (controlErrors != null) {
          console.log(`Key: ${key}, Errors: `, controlErrors);
        }
      });
    }
  }
  

  resetForm() {
    this.manualPpoForm.reset();
  }

  // Get Manual PPO Receipt By Id
  getManualPpoReceiptByTreasuryReceiptId(treasuryReceiptId: string) {
    console.log('Fetching Manual PPO Receipt By Id...');
    this.manualPpoReceiptService.getManualPpoDetailsById(treasuryReceiptId)
      .subscribe((response) => {
        console.log('API Response:', response);
        if (response.apiResponseStatus === 1) {
          this.tableData = response.result;
        } else {
          this.toastService.showAlert(response.message, response.apiResponseStatus);
        }
      });
  }

  // Get All Manual PPO Receipt
  getAllManualPpoReceipt(treasuryReceiptId?: string) {
    this.loading = true;
    if (treasuryReceiptId) {
      this.manualPpoReceiptService.getManualPpoDetailsById(treasuryReceiptId).subscribe(
        (response: any) => {
          this.loading = false;
          if (response && response.apiResponseStatus === 1) {
            const updatedData = [response.result].map((item: any) => ({
              ...item,
              receiptDate: convertDate(item.receiptDate)
            }));
            this.tableData = { headers: this.tableData.headers, data: updatedData, dataCount: updatedData.length };
          } else {
            this.toastService.showAlert(response?.message || 'An error occurred', response?.apiResponseStatus || 0);
          }
          this.cd.detectChanges();
        },
        (error) => {
          this.loading = false;
          console.error('API Error:', error);
          this.toastService.showAlert('An error occurred while fetching data', 0);
        }
      );
    } else {
      this.manualPpoReceiptService.getAllManualPpoReceipt(this.tableQueryParameters).subscribe(
        (response: any) => {
          this.loading = false;
          if (response && response.apiResponseStatus === 1 && response.result) {
            const updatedData = response.result.data.map((item: any) => ({
              ...item,
              receiptDate: convertDate(item.receiptDate)
            }));
            this.tableData = { ...response.result, data: updatedData };
          } else {
            this.toastService.showAlert(response?.message || 'An error occurred', response?.apiResponseStatus || 0);
          }
          this.cd.detectChanges();
        },
        (error) => {
          this.loading = false;
          console.error('API Error:', error);
          this.toastService.showAlert('An error occurred while fetching data', 0);
        }
      );
    }
  }

  EditInit(rowData: any): void {
    console.log('EditInit called with rowData:', rowData);
    this.selectedRow = rowData;
    var treasuryReceiptId: string = this.selectedRow.treasuryReceiptNo;
    console.log('Treasury Receipt ID:', treasuryReceiptId);

    this.manualPpoReceiptService.getManualPpoDetailsById(treasuryReceiptId).subscribe({
        next: response => {
            console.log('Fetched DTO:', response);
            const dateOfCommencement = response.result.dateOfCommencement ? new Date(response.result.dateOfCommencement) : null;
            const receiptDate = response.result.receiptDate ? new Date(response.result.receiptDate) : null;

            this.manualPpoForm.patchValue({
                ppoNo: response.result.ppoNo,
                pensionerName: response.result.pensionerName,
                dateOfCommencement: dateOfCommencement,
                mobileNo: response.result.mobileNumber,  
                receiptDate: receiptDate,
                psaCode: response.result.psaCode,
                ppoType: response.result.ppoType
            });
            console.log('Form Values:', this.manualPpoForm.value);
            this.displayInsertModal = true;
        },
        error: err => {
            this.toastService.showError('Failed to fetch PPO receipt details.');
        }
    });
}


  

  // Update Manual PPO Receipt
  updateManualPpoReceipt() {
    if (this.selectedRowData && this.manualPpoForm.valid) {
      const formData = { ...this.selectedRowData, ...this.manualPpoForm.value };
      this.manualPpoReceiptService.updateManualPpoReceipt(this.treasuryReceiptId,formData).subscribe(
        response => {
          console.log('Update successful:', response);
          this.getAllManualPpoReceipt();  // Refresh table data
          this.resetForm();  // Reset form fields
          this.displayInsertModal = false;  // Close the dialog
        },
        error => {
          if (error instanceof HttpErrorResponse && error.status === 400) {
            console.error('Error updating data:', error);
            const errorMessage = error.error.message;
            this.toastService.showError(errorMessage);
          } else {
            console.error('Error updating data:', error);
            this.toastService.showError('An unexpected error occurred. Please try again.');
          }
        }
      );
    } else {
      console.log('Form is not valid. Cannot update.');
    }
  }

  onRowEditInit(data: manualPpoReceiptEntryDTO) {
    this.selectedRowData = { ...data };
    this.manualPpoForm.patchValue(this.selectedRowData);
    this.displayInsertModal = true;  
  }

  onRowEditCancel() {
    this.selectedRowData = null;
    this.resetForm();
  }

  emitManualPpoReceiptCombination(): void {
    this.ManualPpoReceiptCombinationSelected.emit(this.manualPpoForm.value);
  }

  cancelPpoReceipt() {
    this.manualPpoForm.reset();
    this.displayInsertModal = false;
  }
}
