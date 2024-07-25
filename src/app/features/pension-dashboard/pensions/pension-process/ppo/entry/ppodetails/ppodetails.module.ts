import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RouterModule, Routes } from '@angular/router';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { StepsModule } from 'primeng/steps';

import { DynamicTableModule } from 'src/app/shared/modules/dynamic-table/dynamic-table.module';
import { OptionCardModule } from 'src/app/shared/modules/option-card/option-card.module';
import { CommonHeaderModule } from 'src/app/shared/modules/common-header/common-header.module';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { TreasuryDropdownModule } from 'src/app/shared/modules/treasury-dropdown/treasury-dropdown.module';
import { PpodetailsComponent } from './ppodetails.component';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CardModule } from 'primeng/card';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CheckboxModule } from 'primeng/checkbox';
import { SanctionComponent } from './sanction/sanction.component';
import { PanelModule } from 'primeng/panel';
import { FieldsetModule } from 'primeng/fieldset';
import { FamilyNomineeComponent } from './family-nominee/family-nominee.component';
import { DetailsComponent } from './delails/details.component';
import { BankDetailsComponent } from './bank_details/bankdetails.component';

const routes: Routes = [
  { path: '', component: PpodetailsComponent },
];




@NgModule({
  declarations: [
    PpodetailsComponent,
    FamilyNomineeComponent,
    SanctionComponent,
    DetailsComponent,
    BankDetailsComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextareaModule,
    StepsModule,
    DynamicTableModule,
    OptionCardModule,
    CommonHeaderModule,
    DropdownModule,
    DialogModule,
    CalendarModule,
    TreasuryDropdownModule,
    InputTextModule,
    RadioButtonModule,
    CardModule,
    SelectButtonModule,
    CheckboxModule,
    PanelModule,
    FieldsetModule,
    BrowserModule,
    RouterModule.forChild(routes)
  ],
  providers: [],
  bootstrap: [PpodetailsComponent],
  exports: [RouterModule]
})
export class PpodetailsModule { }
