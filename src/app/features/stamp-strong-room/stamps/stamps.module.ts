import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StampsRoutingModule } from './stamps-routing.module';
import { StampsComponent } from './stamps.component';
import { IndentCaptureComponent } from './indent-capture/indent-capture.component';
import { OptionCardModule } from 'src/app/shared/modules/option-card/option-card.module';
import { InvoiceCaptureComponent } from './invoice-capture/invoice-capture.component';


@NgModule({
  declarations: [
    StampsComponent,
    IndentCaptureComponent,
    InvoiceCaptureComponent
  ],
  imports: [
    CommonModule,
    OptionCardModule,
    StampsRoutingModule
  ]
})
export class StampsModule { }
