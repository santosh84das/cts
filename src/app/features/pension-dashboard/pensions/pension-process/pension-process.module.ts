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

import { AutoCompleteModule } from "primeng/autocomplete";
import { ChipsModule } from "primeng/chips";
import { InputMaskModule } from "primeng/inputmask";
import { InputNumberModule } from "primeng/inputnumber";
import { CascadeSelectModule } from "primeng/cascadeselect";
import { MultiSelectModule } from "primeng/multiselect";
import { InputTextareaModule } from "primeng/inputtextarea";
import { PensionBillComponent } from './pension-bill/pension-bill.component';
import { PentionDetailComponent } from './pention-detail/pention-detail.component';
import { RouterModule } from '@angular/router';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenubarModule } from 'primeng/menubar';
import { TabMenuModule } from 'primeng/tabmenu';
import { StepsModule } from 'primeng/steps';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { MenuModule } from 'primeng/menu';
import { ContextMenuModule } from 'primeng/contextmenu';
import { MegaMenuModule } from 'primeng/megamenu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { BillDetailComponent } from './bill-detail/bill-detail.component';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { RippleModule } from 'primeng/ripple';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { SliderModule } from 'primeng/slider';
import { RatingModule } from 'primeng/rating';
import { ClassificationDetailsComponent } from './classification-details/classification-details.component';
import { ComponentDetailsComponent } from './component-details/component-details.component';

@NgModule({
  declarations: [
    PensionProcessComponent,
    PensionBillComponent,
    PentionDetailComponent,
    BillDetailComponent,
    ClassificationDetailsComponent,
    ComponentDetailsComponent,
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
    PensionProcessRoutingModule,
    AutoCompleteModule,
    ChipsModule,
    InputMaskModule,
    InputNumberModule,
    CascadeSelectModule,
    MultiSelectModule,
    InputTextareaModule,
    InputTextModule,
    BreadcrumbModule,
    MenubarModule,
    TabMenuModule,
    StepsModule,
    TieredMenuModule,
    MenuModule,
    ContextMenuModule,
    MegaMenuModule,
    PanelMenuModule,
    InputTextModule,
    RouterModule,
    ToggleButtonModule,
    RippleModule,
    ProgressBarModule,
    ToastModule,
    SliderModule,
    RatingModule,
    TableModule,
    InputTextModule,
    ToggleButtonModule,
    RippleModule,
  ]
})
export class PensionProcessModule { }
