import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { OptionCardModule } from 'src/app/shared/modules/option-card/option-card.module';
import { VendorWiseEC136Component } from './tds-details/vendor-wise-ec136/vendor-wise-ec136.component';
import { VendorDetailsWiseEC137Component } from './tds-details/vendor-details-wise-ec137/vendor-details-wise-ec137.component';


@NgModule({
  declarations: [ReportsComponent, VendorWiseEC136Component, VendorDetailsWiseEC137Component],
  imports: [
    CommonModule,
    OptionCardModule,
    ReportsRoutingModule,
  ]
})
export class ReportsModule { }
