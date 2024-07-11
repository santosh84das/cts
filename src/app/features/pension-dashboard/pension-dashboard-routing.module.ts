import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PensionDashboardComponent } from './pension-dashboard.component';

const routes: Routes = [
  { path: '', component: PensionDashboardComponent },
  {
    path: 'modules',
    loadChildren: () => import('./pensions/pensions.module').then(m => m.PensionsModule),
  },
  {
    path: 'modules/pension-process',
    loadChildren: () =>
      import('./pensions/pension-process/pension-process.module').then(m => m.PensionProcessModule),
  },
  {
    path: 'modules/pension-process/ppo',
    loadChildren: () => import('./pensions/pension-process/ppo/ppo.module').then(m => m.PpoModule),
  },
  {
    path: 'modules/pension-process/ppo/entry',
    loadChildren: () => import('./pensions/pension-process/ppo/entry/entry.module').then(m => m.EntryModule),
  },
  {
    path: 'modules/pension-process/ppo/entry/ppodetails',
    loadChildren: () =>
      import('./pensions/pension-process/ppo/entry/ppodetails/ppodetails.module').then(m => m.PpodetailsModule),
  },
  {
    path: 'modules/pension-process/ppo/manual-ppo-receipt',
    loadChildren: () =>
      import('./pensions/pension-process/ppo/manual-ppo-receipt/manual-ppo-receipt.module').then(m => m.ManualPpoReceiptModule),
  },
  {
    path: 'modules/pension-process/ppo/entry/sanction',
    loadChildren: () => import('./pensions/pension-process/ppo/entry/sanction/sanction.module').then(m => m.SanctionModule),
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class PensionDashboardRoutingModule {}
