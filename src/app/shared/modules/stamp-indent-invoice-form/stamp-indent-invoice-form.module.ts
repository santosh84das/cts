import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { OptionCardModule } from '../option-card/option-card.module';
import { TreasuryDropdownModule } from '../treasury-dropdown/treasury-dropdown.module';
import { CalendarModule } from 'primeng/calendar';
import { StampIndentInvoiceFormComponent } from './stamp-indent-invoice-form.component';



@NgModule({
  declarations: [StampIndentInvoiceFormComponent],
  imports: [
    CommonModule,
    ButtonModule,
    OptionCardModule,
    ButtonModule,
    DropdownModule,
    DialogModule,
    CalendarModule,
    TreasuryDropdownModule,
  ],
  exports: [StampIndentInvoiceFormComponent]
})
export class StampIndentInvoiceFormModule { }
