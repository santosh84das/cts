import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PensionBillRoutingModule } from './pension-bill-routing.module';

@NgModule({
  declarations: [ PensionBillModule], // PensionBillModule should not be declared here
  imports: [
    CommonModule,
    PensionBillRoutingModule,
    RouterModule
  ],
  exports: []
})
export class PensionBillModule { }
