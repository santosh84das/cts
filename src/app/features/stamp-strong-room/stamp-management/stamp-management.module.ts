import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StampManagementRoutingModule } from './stamp-management-routing.module';
import { StampManagementComponent } from './stamp-management.component';
import { StampRequisitionComponent } from './stamp-requisition/stamp-requisition.component';
import { OptionCardModule } from 'src/app/shared/modules/option-card/option-card.module';
import { CommonHeaderModule } from 'src/app/shared/modules/common-header/common-header.module';
import { NewStampRequisitionComponent } from './new-stamp-requisition/new-stamp-requisition.component';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';


@NgModule({
  declarations: [StampManagementComponent, StampRequisitionComponent, NewStampRequisitionComponent],
  imports: [
    CommonModule,
    ButtonModule,
    CalendarModule,
    InputNumberModule,
    CheckboxModule,
    OptionCardModule,
    CommonHeaderModule,
    StampManagementRoutingModule
  ]
})
export class StampManagementModule { }
