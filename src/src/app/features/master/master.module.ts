import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterRoutingModule } from './master-routing.module';
import { MasterComponent } from './master.component';
import { OptionCardModule } from 'src/app/shared/modules/option-card/option-card.module';


@NgModule({
  declarations: [MasterComponent],
  imports: [
    CommonModule,
    MasterRoutingModule,
    OptionCardModule
  ]
})
export class MasterModule { }
