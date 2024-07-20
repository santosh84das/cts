import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PensionBillRoutingModule } from './pension-bill-routing.module';
import { PentionDetailComponent } from './../pention-detail/pention-detail.component';

@NgModule({
  declarations: [PentionDetailComponent, PensionBillModule], // PensionBillModule should not be declared here
  imports: [
    CommonModule,
    PensionBillRoutingModule,
    RouterModule
  ],
  exports: [PentionDetailComponent]
})
export class PensionBillModule { }
