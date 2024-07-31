import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PensionProcessComponent } from './pension-process.component';
import { PpoComponent } from './ppo/ppo.component';
import { EntryComponent } from './ppo/entry/entry.component';
import { PensionerDetailsComponent } from './pensioner-details/pensioner-details.component';
import {PensionBillComponent} from './pension-bill/pension-bill.component'

const routes: Routes = [


  {path: '', component: PensionProcessComponent},
  {path: 'ppo', component: PpoComponent},
  {path: 'pensioner-details', component: PensionerDetailsComponent},
  {path: 'pension-bill',component:PensionBillComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PensionProcessRoutingModule { }
