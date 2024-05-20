import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StampsComponent } from './stamps.component';
import { IndentCaptureComponent } from './indent-capture/indent-capture.component';
import { InvoiceCaptureComponent } from './invoice-capture/invoice-capture.component';

const routes: Routes = [{path: '', component: StampsComponent},
  {path: 'indent-capture', component: IndentCaptureComponent},
  {path: 'invoice-capture', component: InvoiceCaptureComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StampsRoutingModule { }
