import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PensionComponent } from './pension.component';
// import { ComponentRateComponent } from './component-rate/component-rate.component';

const routes: Routes = [
  {path: '', component:PensionComponent},
  // {path: 'component-rate', component:ComponentRateComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PensionRoutingModule { }
