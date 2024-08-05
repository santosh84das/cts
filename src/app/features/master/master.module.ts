import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterRoutingModule } from './master-routing.module';
import { MasterComponent } from './master.component';
import { OptionCardModule } from 'src/app/shared/modules/option-card/option-card.module';
import { PensionComponent } from './pension/pension.component';



@NgModule({
  declarations: [MasterComponent, PensionComponent],
  imports: [
    CommonModule,
    MasterRoutingModule,
    OptionCardModule
  ]
})
export class MasterModule { }
