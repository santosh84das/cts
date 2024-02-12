import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentMandateRoutingModule } from './payment-mandate-routing.module';
import { PaymentMandateComponent } from './payment-mandate.component';
import { OptionCardModule } from 'src/app/shared/modules/option-card/option-card.module';


@NgModule({
  declarations: [PaymentMandateComponent],
  imports: [
    CommonModule,
    PaymentMandateRoutingModule,
    OptionCardModule
  ]
})
export class PaymentMandateModule { }
