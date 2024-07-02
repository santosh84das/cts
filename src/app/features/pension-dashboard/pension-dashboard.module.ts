import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PensionDashboardRoutingModule } from './pension-dashboard-routing.module';
import { OptionCardModule } from 'src/app/shared/modules/option-card/option-card.module';
import { PensionDashboardComponent } from './pension-dashboard.component';



@NgModule({
  declarations: [PensionDashboardComponent],
  imports: [
    CommonModule,
    OptionCardModule,
    PensionDashboardRoutingModule,
  ]
})
export class PensionDashboardModule { }
