import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PensionCategoryComponent } from './pension-category/pension-category.component';
import { PensionBankBranchComponent } from './pension-bank-branch/pension-bank-branch.component';
import { ManualAgwbPpoComponent } from './manual-agwb-ppo/manual-agwb-ppo.component';
import { PensionsComponent } from './pensions.component';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PensionsRoutingModule } from './pensions-routing.module';
import { DynamicTableModule } from 'src/app/shared/modules/dynamic-table/dynamic-table.module';
import { OptionCardModule } from 'src/app/shared/modules/option-card/option-card.module';
import { CommonHeaderModule } from 'src/app/shared/modules/common-header/common-header.module';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { TreasuryDropdownModule } from 'src/app/shared/modules/treasury-dropdown/treasury-dropdown.module';



@NgModule({
  declarations: [
    PensionCategoryComponent,
    PensionBankBranchComponent,
    ManualAgwbPpoComponent,
    PensionsComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    ReactiveFormsModule,
    PensionsRoutingModule,
    DynamicTableModule,
    OptionCardModule,
    ButtonModule,
    CommonHeaderModule,
    DropdownModule,
    DialogModule,
    CalendarModule,
    ReactiveFormsModule,
    TreasuryDropdownModule,
    FormsModule
   ]
})
export class PensionsModule { }
