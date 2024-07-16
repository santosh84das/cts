import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TdsDetailsRoutingModule } from './tds-details-routing.module';
import { OptionCardModule } from 'src/app/shared/modules/option-card/option-card.module';
import { TdsDetailsComponent } from './tds-details.component';
import { VendorDetailsWiseEC137Component } from './vendor-details-wise-ec137/vendor-details-wise-ec137.component';
import { VendorWiseEC136Component } from './vendor-wise-ec136/vendor-wise-ec136.component';
import { OptionCardComponent } from 'src/app/shared/modules/option-card/option-card.component';


@NgModule({
  declarations: [TdsDetailsComponent, VendorDetailsWiseEC137Component, VendorWiseEC136Component],
  imports: [
    CommonModule,
    // OptionCardModule,
    TdsDetailsRoutingModule
  ],
})
export class TdsDetailsModule { }
