import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayMandateShortlistRoutingModule } from './pay-mandate-shortlist-routing.module';
import { PayMandateShortlistComponent } from './pay-mandate-shortlist.component';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToggleButtonModule } from 'primeng/togglebutton';
import {SelectButtonModule} from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [PayMandateShortlistComponent],
  imports: [
    CommonModule,
    PayMandateShortlistRoutingModule,
    ToolbarModule,
    ButtonModule,
    RippleModule,
    ToggleButtonModule,
    SelectButtonModule,
    FormsModule
  ]
})
export class PayMandateShortlistModule { }
