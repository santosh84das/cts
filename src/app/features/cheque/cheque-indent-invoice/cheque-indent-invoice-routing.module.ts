import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChequeIndentComponent } from './cheque-indent/cheque-indent.component';
import { ChequeInvoiceComponent } from './cheque-invoice/cheque-invoice.component';
import { ChequeIndentInvoiceComponent } from './cheque-indent-invoice.component';

const routes: Routes = [
  {path:"",component:ChequeIndentInvoiceComponent},
  {path:'cheque-indent', component:ChequeIndentComponent},
  {path:'cheque-invoice', component:ChequeInvoiceComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChequeIndentInvoiceRoutingModule { }
