import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChequeIndentComponent } from './cheque-indent/cheque-indent.component';
import { ChequeInvoiceComponent } from './cheque-invoice/cheque-invoice.component';
import { ChequeComponent } from './cheque.component';

const routes: Routes = [
  {path:"",component:ChequeComponent},
  {path:'cheque-indent', component:ChequeIndentComponent},
  {path:'cheque-invoice', component:ChequeInvoiceComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChequeRoutingModule { }
