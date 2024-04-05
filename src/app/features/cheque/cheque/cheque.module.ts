import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChequeRoutingModule } from './cheque-routing.module';
import { ChequeComponent } from './cheque.component';
import { ChequeIndentComponent } from './cheque-indent/cheque-indent.component';
import { ChequeInvoiceComponent } from './cheque-invoice/cheque-invoice.component';
import { CommonHeaderModule } from "../../../shared/modules/common-header/common-header.module";
import { ButtonModule } from 'primeng/button';
import { OptionCardModule } from 'src/app/shared/modules/option-card/option-card.module';
import {CardModule} from 'primeng/card';
import { CalendarModule } from 'primeng/calendar';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {DropdownModule} from 'primeng/dropdown';
import {FormsModule , ReactiveFormsModule } from '@angular/forms';
import {RippleModule} from 'primeng/ripple';




@NgModule({
    declarations: [
        ChequeComponent,
        ChequeIndentComponent,
        ChequeInvoiceComponent
    ],
    imports: [
        CommonModule,
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
        ReactiveFormsModule 
        
    ]
})
export class ChequeModule { }
