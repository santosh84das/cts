import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PensionCategoryComponent } from './pension-category/pension-category.component';
import { PensionBankBranchComponent } from './pension-bank-branch/pension-bank-branch.component';
import { ManualAgwbPpoComponent } from './manual-agwb-ppo/manual-agwb-ppo.component';
import { PensionDashboardComponent } from '../pension-dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { PensionsComponent } from './pensions.component';


const routes: Routes = [{path: '', component: PensionsComponent},
  {path: 'category', component: PensionCategoryComponent},
  {path: 'bank-branch', component: PensionBankBranchComponent},
  {path: 'manual-agwb', component: ManualAgwbPpoComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PensionsRoutingModule { }
