import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StampsRoutingModule } from './stamps-routing.module';
import { StampsComponent } from './stamps.component';
import { IndentCaptureComponent } from './indent-capture/indent-capture.component';
import { OptionCardModule } from 'src/app/shared/modules/option-card/option-card.module';
import { InvoiceCaptureComponent } from './invoice-capture/invoice-capture.component';
import { CommonHeaderModule } from 'src/app/shared/modules/common-header/common-header.module';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';


@NgModule({
  declarations: [
    StampsComponent,
    IndentCaptureComponent,
    InvoiceCaptureComponent
  ],
  imports: [
    CommonModule,
    StampsRoutingModule,
    OptionCardModule,
    ButtonModule,
    CommonHeaderModule,
    DialogModule
  ]
})
export class StampsModule { }
