import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PensionProcessComponent } from './pension-process.component';
import { PpoComponent } from './ppo/ppo.component';
import { EntryComponent } from './ppo/entry/entry.component';
import { PensionBillComponent } from './pension-bill/pension-bill.component';
import { PentionDetailComponent } from './pention-detail/pention-detail.component';
import { BillDetailComponent } from './bill-detail/bill-detail.component';
import { ClassificationDetailsComponent } from './classification-details/classification-details.component';
import { ComponentDetailsComponent } from './component-details/component-details.component';
const routes: Routes = [
    { path: '', component: PensionProcessComponent },
    { path: 'ppo', component: PpoComponent },
    { path: 'app-pension-billS', component: PensionBillComponent },
    { path: 'app-pension-detail', component: PentionDetailComponent },
    { path: 'app-bill-detail', component: BillDetailComponent },
    {
        path: 'app-classification-details',
        component: ClassificationDetailsComponent,
    },
    { path: 'app-component-details', component: ComponentDetailsComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PensionProcessRoutingModule {}

// pension-process-routing.module.ts
