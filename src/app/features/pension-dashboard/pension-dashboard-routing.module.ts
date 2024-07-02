import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PensionDashboardComponent } from './pension-dashboard.component';
import { PensionsComponent } from './pensions/pensions.component';

const routes: Routes = [{path: '', component: PensionDashboardComponent},
  {path: 'modules', loadChildren: () => import('./pensions/pensions.module').then(m => m.PensionsModule)}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PensionDashboardRoutingModule { }
