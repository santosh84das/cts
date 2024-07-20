import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-pension-bill',
  templateUrl: 'pension-bill.component.html',
  providers: [MessageService, ConfirmationService],
  styles: [`:host ::ng-deep .p-menubar-root-list {
    flex-wrap: wrap;
}`]
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

  constructor(private router: Router, private productService: ProductService) {
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

  ngOnInit(): void {
    this.productService
      .getProductsWithOrdersSmall()
      .then((data) => (this.products = data));
  }

  next() {
    this.currentStepIndex++;
  }

  prev() {
    if (this.currentStepIndex > 0) {
      this.currentStepIndex--;
    }
  }
  save(){}

  expandAll() {
    if (!this.isExpanded) {
      this.products.forEach((product) =>
        product && product.name
          ? (this.expandedRows[product.name] = true)
          : ''
      );
    } else {
      this.expandedRows = {};
    }
    this.isExpanded = !this.isExpanded;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal(
      (event.target as HTMLInputElement).value,
      'contains'
    );
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }
}