import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PensionCategoryComponent } from './pension-category/pension-category.component';
import { PensionBankBranchComponent } from './pension-bank-branch/pension-bank-branch.component';
import { ManualAgwbPpoComponent } from './manual-agwb-ppo/manual-agwb-ppo.component';
import { PensionDashboardComponent } from '../pension-dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { PensionsComponent } from './pensions.component';
import { PensionProcessComponent } from './pension-process/pension-process.component';
import { PensionReportsComponent } from './pension-reports/pension-reports.component';
import { PensionQueryComponent } from './pension-query/pension-query.component';
import { PensionBillComponent } from './pension-process/pension-bill/pension-bill.component';


const routes: Routes = [{path: '', component: PensionsComponent},
  {path: 'pension-process', component: PensionProcessComponent},
  {path: 'pension-reports', component: PensionReportsComponent},
  {path: 'pension-query', component: PensionQueryComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PensionsRoutingModule { }
