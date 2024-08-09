import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Product } from 'src/app/demo/api/product';
import { Table } from 'primeng/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SearchPopupComponent } from 'src/app/core/search-popup/search-popup.component';
import { SearchPopupConfig } from 'src/app/core/search-popup/search-popup.component';
import { PensionBill } from 'src/app/core/services/pension-bill/pension-bill.service'
import { PensionBillResponse, PensionCategory, PensionerPayment } from 'src/app/core/models/pension-bill';
import { flush } from '@angular/core/testing';

@Component({
  selector: 'app-pension-bill',
  templateUrl: 'pension-bill.component.html',
  providers: [MessageService, ConfirmationService, DialogService],
  styles: [`
    :host ::ng-deep .p-menubar-root-list {
      flex-wrap: wrap;
    }
  `]
})
export class PensionBillComponent implements OnInit {
  dropdownItems: any[] = [];
  ref: DynamicDialogRef | undefined;
  currentStepIndex: number = 0;
  selectedMode: any = null;
  statuses: any[] = [];
  products: Product[] = [];
  rowGroupMetadata: any;
  expandedRows: { [key: string]: boolean } = {};
  isExpanded: boolean = false;
  ppoId: string = '';
  payments: PensionerPayment[] = [];
  pensioncategory: PensionCategory | string = '';
  period: string = '';
  @ViewChild('filter') filter!: ElementRef;
  pensionForm: FormGroup = this.fb.group({});
  isCurrentStepValid = false;
  totalDueAmount: number = 0;
  apiUrl: string = 'v1/ppo/details'; // Your API URL
  isDataLoaded: boolean = false;


  constructor(
    private fb: FormBuilder,
    private dialogService: DialogService,
    private service: PensionBill
  ) { }

  ngOnInit() {
    this.dropdownItems = [
      { label: 'Babk', value: 'B' },
      { label: 'Neft', value: 'N' }
    ];
    const today = new Date().toISOString().split('T')[0];

    this.pensionForm = this.fb.group({
      ppoId: ['', Validators.required],
      ppoNo: ['', Validators.required],
      pensionerName: ['', Validators.required],
      periodFrom: ['', Validators.required],
      periodTo: ['', Validators.required],
      bankName: ['', Validators.required],
      accountNo: ['', Validators.required],
      billDate: [today, Validators.required],
      // paymentMode: [null, Validators.required]
    });
    // this.clickListener = this.handleClick.bind(this);


    this.pensionForm.valueChanges.subscribe(() => {
      this.updateStepValidity();
    });
    this.updateStepValidity();
  }



  expandAll() {
    if (!this.isExpanded) {
      this.products.forEach((product) =>
        product && product.name ? (this.expandedRows[product.name] = true) : ''
      );
    } else {
      this.expandedRows = {};
    }
    this.isExpanded = !this.isExpanded;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }


  updateStepValidity() {
    this.isCurrentStepValid = this.getCurrentStepControls().valid;
  }

  getCurrentStepControls() {
    return this.pensionForm; // Adjust if steps have separate forms
  }

  save() {
    if (this.pensionForm.valid) {
      console.log(this.pensionForm.value);
      // Handle save logic, e.g., send data to a backend
    } else {
      this.updateStepValidity(); // Ensure step validity is updated on save attempt
    }
  }

  // search popup control

  openSearchPopup() {
    const payload = {
      listType: 'type1',
      pageSize: 200,
      pageIndex: 0,
      filterParameters: [],
      sortParameters: {
        field: 'ppoNo',
        order: 'asc'
      }
    };

    const config: SearchPopupConfig = {
      payload: payload,
      apiUrl: this.apiUrl
    };

    this.ref = this.dialogService.open(SearchPopupComponent, {
      data: config,
      header: 'Search record',
      width: '50%'
    });

    this.ref.onClose.subscribe((record: any) => {
      if (record) {
        this.pensionForm.patchValue({
          ppoId: record.ppoId
        });
        this.ppoId = record.ppoId; // Update ppoId // Re-evaluate event listener
      }
    });
  }

  getvalue() {
    const payload2 = {
      ppoId: this.ppoId,
      toDate: this.period
    }
    if (this.ppoId && this.period) {
      this.service.getrecord(payload2).subscribe({
        next: (response: PensionBillResponse) => {
          if (response && response.result) {
            const result = response.result;
            this.pensionForm.patchValue({
              ppoNo: result.pensioner.ppoNo,
              pensionerName: result.pensioner.pensionerName,
              periodFrom: result.pensioner.dateOfRetirement,
              bankName: result.bankAccount.bankName,
              accountNo: result.bankAccount.bankAcNo
            });
            this.payments = result.pensionerPayments;
            this.pensioncategory = result.pensionCategory;
            console.log(this.pensioncategory)
            this.calculateTotalDueAmount();
            this.isDataLoaded = true;

          }
        },
        error: (err) => {
          console.error('Error fetching record:', err);
        }
      });
    }
  }
  calculateTotalDueAmount() {
    this.totalDueAmount = this.payments.reduce((acc, payment) => acc + payment.dueAmount, 0);
  }

}
