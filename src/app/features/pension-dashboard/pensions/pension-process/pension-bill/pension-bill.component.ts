import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';
import { Table } from 'primeng/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SearchPopupComponent } from 'src/app/core/search-popup/search-popup.component';
import { SearchPopupConfig } from 'src/app/core/search-popup/search-popup.component';

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

  @ViewChild('filter') filter!: ElementRef;
  pensionForm: FormGroup = this.fb.group({});
  isCurrentStepValid = false;
  apiUrl: string = 'v1/ppo/details'; // Your API URL

  constructor(
    private fb: FormBuilder,
    private dialogService: DialogService,
  ) { }

  ngOnInit() {
    this.dropdownItems = [
      { label: 'Babk', value: 'B' },
      { label: 'Neft', value: 'N' }
    ];

    this.pensionForm = this.fb.group({
      ppoId: ['', Validators.required],
      ppoNo: ['', Validators.required],
      pensionerName: ['', Validators.required],
      periodFrom: ['', Validators.required],
      periodTo: ['', Validators.required],
      bankName: ['', Validators.required],
      accountNo: ['', Validators.required],
      billDate: ['', Validators.required],
      paymentMode: [null, Validators.required]
    });

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

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
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
        pageSize: 10,
     pageIndex: 0,
    filterParameters: [],
     sortParameters: {
    field: 'ppoNo',
    order: 'asc'}
    };

    const config: SearchPopupConfig = {
      payload: payload,
      apiUrl: this.apiUrl
    };

    this.ref = this.dialogService.open(SearchPopupComponent, {
      data: config,
      header: 'Search Records',
      width: '60%'
    });

    this.ref.onClose.subscribe((record: any) => {
      if (record) {
        this.pensionForm.patchValue({
          ppoNo: record.ppoNo,
          ppoId: record.ppoId,
          pensionerName: record.pensionerName,
          periodFrom: record.periodFrom,
          periodTo: record.periodTo,
          accountNo: record.accountNo,
          bankName: record.bankName
        });
      }
    });
  }
}