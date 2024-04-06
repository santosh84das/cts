import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChequeRoutingModule } from './cheque-routing.module';
import { ChequeComponent } from './cheque.component';
import { OptionCardModule } from 'src/app/shared/modules/option-card/option-card.module';
import { CommonHeaderModule } from 'src/app/shared/modules/common-header/common-header.module';
import { ButtonModule } from 'primeng/button';

@NgModule({
    declarations: [
        ChequeComponent,
    ],
    imports: [
        CommonModule,
        ChequeRoutingModule,
        OptionCardModule,
        CommonHeaderModule,
        ButtonModule
    ]
})
export class ChequeModule { }
