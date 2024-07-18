import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TdsDetailsComponent } from './tds-details.component';
import { VendorDetailsWiseEC137Component } from './vendor-details-wise-ec137/vendor-details-wise-ec137.component';
import { VendorWiseEC136Component } from './vendor-wise-ec136/vendor-wise-ec136.component';

const routes: Routes = [
  {path: '', component: TdsDetailsComponent},
  {path: 'vendor-details-wise-ec137', component: VendorDetailsWiseEC137Component},
  {path: 'vendor-wise-ec136', component: VendorWiseEC136Component},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TdsDetailsRoutingModule { }
