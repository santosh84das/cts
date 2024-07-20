import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PensionBillComponent } from './pension-bill.component';
import {PentionDetailComponent} from './../pention-detail/pention-detail.component'

const routes: Routes = [
    {path:'', component: PensionBillComponent},
    {path:'pention-detail', component: PentionDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PensionBillRoutingModule { }
