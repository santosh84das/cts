import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PensionRoutingModule } from './pension-routing.module';
import { PensionComponent } from './pension.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: "",component:PensionComponent},
  {path: "pension",component:PensionComponent},
];
@NgModule({
  declarations: [
    PensionComponent
  ],
  imports: [
    CommonModule,
    PensionRoutingModule,
    RouterModule.forChild(routes),
  ],
  exports: [PensionComponent],
  bootstrap: [PensionComponent]
})
export class PensionModule { }
