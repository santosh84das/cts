import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DynamicTableModule } from 'src/app/shared/modules/dynamic-table/dynamic-table.module';
import { OptionCardModule } from 'src/app/shared/modules/option-card/option-card.module';
import { CommonHeaderModule } from 'src/app/shared/modules/common-header/common-header.module';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { TreasuryDropdownModule } from 'src/app/shared/modules/treasury-dropdown/treasury-dropdown.module';
import { PensionProcessComponent } from './pension-process.component';
import { PensionProcessRoutingModule } from './pension-process-routing.module';

@NgModule({
  declarations: [
    PensionProcessComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    ReactiveFormsModule,
    DynamicTableModule,
    OptionCardModule,
    CommonHeaderModule,
    DropdownModule,
    DialogModule,
    CalendarModule,
    TreasuryDropdownModule,
    FormsModule,
    PensionProcessRoutingModule
  ]
})
export class PensionProcessModule { }
