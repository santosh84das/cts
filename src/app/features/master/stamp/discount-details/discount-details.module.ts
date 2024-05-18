import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiscountDetailsRoutingModule } from './discount-details-routing.module';
import { DiscountDetailsComponent } from './discount-details.component';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [DiscountDetailsComponent],
  imports: [
    CommonModule,
    DropdownModule,
    DiscountDetailsRoutingModule,

  ]
})
export class DiscountDetailsModule { }
