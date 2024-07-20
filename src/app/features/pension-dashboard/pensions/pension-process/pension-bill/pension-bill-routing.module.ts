import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { PensionBillComponent } from './pension-bill.component';
import {PentionDetailComponent} from './../pention-detail/pention-detail.component'
import { BillDetailComponent } from '../bill-detail/bill-detail.component';

const routes: Routes = [
    {path:'', component: BillDetailComponent},
    {path:'pention-detail', component: PentionDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PensionBillRoutingModule { }
