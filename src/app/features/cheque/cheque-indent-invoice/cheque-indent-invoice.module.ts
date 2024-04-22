import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChequeIndentInvoiceRoutingModule } from './cheque-indent-invoice-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RippleModule } from 'primeng/ripple';
import { CommonHeaderModule } from 'src/app/shared/modules/common-header/common-header.module';
import { OptionCardModule } from 'src/app/shared/modules/option-card/option-card.module';
import { ChequeRoutingModule } from '../cheque-routing.module';
import { ChequeIndentInvoiceComponent } from './cheque-indent-invoice.component';
import { ChequeIndentComponent } from './cheque-indent/cheque-indent.component';
import { ChequeInvoiceComponent } from './cheque-invoice/cheque-invoice.component';
import { NewIndentComponent } from './cheque-invoice/new-indent/new-indent.component';
import { DynamicTableModule } from 'src/app/shared/modules/dynamic-table/dynamic-table.module';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
  declarations: [ChequeIndentInvoiceComponent,ChequeIndentComponent,ChequeInvoiceComponent,NewIndentComponent],
  imports: [
    CommonModule,
    ChequeIndentInvoiceRoutingModule,
    ChequeRoutingModule,
    CommonHeaderModule,
    ButtonModule,
    OptionCardModule,
    CardModule,
    CalendarModule,
    InputTextareaModule,
    DropdownModule,
    FormsModule,
    RippleModule,
    ReactiveFormsModule,
    DialogModule,
    HttpClientModule,
    ConfirmDialogModule,
    DynamicTableModule 
  ]
})
export class ChequeIndentInvoiceModule { }
