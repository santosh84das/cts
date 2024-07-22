// import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
// import { Router } from '@angular/router';
// import { MessageService, ConfirmationService } from 'primeng/api';
// import { Product } from 'src/app/demo/api/product';
// import { ProductService } from 'src/app/demo/service/product.service';
// import { Table } from 'primeng/table';
// import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-pension-bill',
//   templateUrl: 'pension-bill.component.html',
//   providers: [MessageService, ConfirmationService],
//   styles: [`:host ::ng-deep .p-menubar-root-list {
//     flex-wrap: wrap;
// }`]
// })
// export class PensionBillComponent implements OnInit {
//   steps: any[];
//   currentStepIndex: number = 0;
//   dropdownItems: { name: string; code: string; }[];
//   selectedMode: any = null;
//   statuses: any[] = [];

//   products: Product[] = [];

//   rowGroupMetadata: any;

//   expandedRows: { [key: string]: boolean } = {};

//   isExpanded: boolean = false;

//   @ViewChild('filter') filter!: ElementRef;
//   pensionForm: any;
//   isCurrentStepValid = false;
 
//   constructor(private router: Router, private productService: ProductService,private fb: FormBuilder) {
//     this.steps = [
//       { label: 'Pension Details' },
//       { label: 'Bill Details' },
//       { label: 'Component Details' }
//     ];
//     this.dropdownItems = [
//       { name: 'Treasury', code: 'Treasury' },
//       { name: 'Option 2', code: 'Option 2' },
//       { name: 'Option 3', code: 'Option 3' }
//     ];
//   }

//   // ngOnInit(): void {
    
//   // }

//   next() {
//     if (this.isCurrentStepValid) {
//       this.currentStepIndex++;
//       this.updateStepValidity();
//     }
//   }

//   prev() {
//     if (this.currentStepIndex > 0) {
//       this.currentStepIndex--;
//       this.updateStepValidity();
//     }

//   }

//   expandAll() {
//     if (!this.isExpanded) {
//       this.products.forEach((product) =>
//         product && product.name
//           ? (this.expandedRows[product.name] = true)
//           : ''
//       );
//     } else {
//       this.expandedRows = {};
//     }
//     this.isExpanded = !this.isExpanded;
//   }

//   onGlobalFilter(table: Table, event: Event) {
//     table.filterGlobal(
//       (event.target as HTMLInputElement).value,
//       'contains'
//     );
//   }

//   clear(table: Table) {
//     table.clear();
//     this.filter.nativeElement.value = '';
//   }
//   // pensionForm = new FormGroup({
//   //   ppoId: new FormControl('',Validators.required),
//   //   ppoNo: new FormControl('',Validators.required),
//   //   pensionerName: new FormControl('',Validators.required),
//   //   periodFrom: new FormControl('',Validators.required),
//   //   periodTo: new FormControl('',Validators.required),
//   //   bankName: new FormControl('',Validators.required),
//   //   accountNo: new FormControl('',Validators.required),
//   //   billDate: new FormControl('',Validators.required)
//   // });
//   // save() {
//   //   if (this.pensionForm.valid) {
//   //     console.log(this.pensionForm.value);
//   //   }
//   // }
//   // get isCurrentStepValid(): boolean {
//   //   if (this.currentStepIndex === 0) {
//   //     return this.pensionForm.valid; // Validate all fields on step 0
//   //   }
//   //   // Add validation checks for other steps if needed
//   //   return true;
//   // }
//   ngOnInit() {
//     this.productService
//       .getProductsWithOrdersSmall()
//       .then((data) => (this.products = data));

//     this.pensionForm = this.fb.group({
//       ppoId: ['', Validators.required],
//       ppoNo: ['', Validators.required],
//       pensionerName: ['', Validators.required],
//       periodFrom: ['', Validators.required],
//       periodTo: ['', Validators.required],
//       bankName: ['', Validators.required],
//       accountNo: ['', Validators.required],
//       billDate: ['', Validators.required],
//       paymentMode: [null, Validators.required]
//     });

//     this.steps = [
//       { label: 'Pension Details' },
//       { label: 'Bill Details' },
//       { label: 'Component Detail' }
//     ];

//     this.updateStepValidity();
//   }

//   updateStepValidity() {
//     const currentStepControls = this.getCurrentStepControls();
//     this.isCurrentStepValid = currentStepControls.valid;
//   }

//   getCurrentStepControls() {
//     switch (this.currentStepIndex) {
//       case 0:
//         return this.pensionForm; // Update if steps have separate form groups
//       case 1:
//         return this.pensionForm; // Example, adjust based on your form structure
//       case 2:
//         return this.pensionForm; // Example, adjust based on your form structure
//       default:
//         return this.pensionForm;
//     }
//   }
//   save() {}




// }
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';
import { Table } from 'primeng/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pension-bill',
  templateUrl: 'pension-bill.component.html',
  providers: [MessageService, ConfirmationService],
  styles: [`:host ::ng-deep .p-menubar-root-list { flex-wrap: wrap; }`]
})
export class PensionBillComponent implements OnInit {
  steps: any[];
  currentStepIndex: number = 0;
  dropdownItems: { name: string; code: string; }[];
  selectedMode: any = null;
  statuses: any[] = [];
  products: Product[] = [];
  rowGroupMetadata: any;
  expandedRows: { [key: string]: boolean } = {};
  isExpanded: boolean = false;

  @ViewChild('filter') filter!: ElementRef;
  pensionForm: FormGroup = this.fb.group({});

  isCurrentStepValid = false;

  constructor(
    private router: Router,
    private productService: ProductService,
    private fb: FormBuilder
  ) {
    this.steps = [
      { label: 'Pension Details' },
      { label: 'Bill Details' },
      { label: 'Component Details' }
    ];
    this.dropdownItems = [
      { name: 'Treasury', code: 'Treasury' },
      { name: 'Option 2', code: 'Option 2' },
      { name: 'Option 3', code: 'Option 3' }
    ];
  }

  ngOnInit() {
    this.productService.getProductsWithOrdersSmall().then(data => (this.products = data));

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

  next() {
    if (this.isCurrentStepValid) {
      this.currentStepIndex++;
      this.updateStepValidity();
    }
  }

  prev() {
    if (this.currentStepIndex > 0) {
      this.currentStepIndex--;
      this.updateStepValidity();
    }
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
}
