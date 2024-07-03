import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PensionProcessComponent } from './pension-process.component';
import { PpoComponent } from './ppo/ppo.component';

const routes: Routes = [{path: '', component: PensionProcessComponent},
  {path: 'ppo', component: PpoComponent},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PensionProcessRoutingModule { }
