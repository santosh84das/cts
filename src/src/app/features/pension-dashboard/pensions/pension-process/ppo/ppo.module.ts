import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { DynamicTableModule } from 'src/app/shared/modules/dynamic-table/dynamic-table.module';
import { OptionCardModule } from 'src/app/shared/modules/option-card/option-card.module';
import { CommonHeaderModule } from 'src/app/shared/modules/common-header/common-header.module';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { TreasuryDropdownModule } from 'src/app/shared/modules/treasury-dropdown/treasury-dropdown.module';
import { PpoComponent } from './ppo.component';
import { EntryComponent } from './entry/entry.component';
import { ManualPpoReceiptComponent } from './manual-ppo-receipt/manual-ppo-receipt.component';
import { SanctionComponent } from './entry/sanction/sanction.component';



const routes: Routes = [
  {path: '', component: PpoComponent},
  {path: 'entry', component: EntryComponent},
  {path: 'manualPpoReceipt', component: ManualPpoReceiptComponent},
  {path: 'sanction', component: SanctionComponent}
];


@NgModule({
  declarations: [PpoComponent],
  imports: [
    CommonModule,
    ButtonModule,
    ReactiveFormsModule,    
    DynamicTableModule,
    OptionCardModule,
    ButtonModule,
    CommonHeaderModule,
    DropdownModule,
    DialogModule,
    CalendarModule,
    ReactiveFormsModule,
    TreasuryDropdownModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PpoModule { }
