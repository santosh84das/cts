import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChequeEntryRoutingModule } from './cheque-entry-routing.module';
import { OptionCardModule } from 'src/app/shared/modules/option-card/option-card.module';
import { CommonHeaderModule } from 'src/app/shared/modules/common-header/common-header.module';
import { ChequeEntryComponent } from './cheque-entry.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {InputNumberModule} from 'primeng/inputnumber';



@NgModule({
  declarations: [ChequeEntryComponent],
  imports: [
    CommonModule,
    ChequeEntryRoutingModule,
    OptionCardModule,
    CommonHeaderModule,
    CardModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    InputNumberModule
  ]
})
export class ChequeEntryModule { }
