import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PensionProcessComponent } from './pension-process.component';
import { PpoComponent } from './ppo/ppo.component';

import { LifeCertificateComponent } from './ppo/life-certificate/life-certificate.component';

const routes: Routes = [
  {path: '', component: PensionProcessComponent},
  {path: 'ppo', component: PpoComponent},
  // path added for life-certificate
  {path: 'life-certificate',component: LifeCertificateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PensionProcessRoutingModule { }
