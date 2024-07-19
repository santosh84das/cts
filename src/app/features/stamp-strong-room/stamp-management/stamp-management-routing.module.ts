import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StampManagementComponent } from './stamp-management.component';
import { StampRequisitionComponent } from './stamp-requisition/stamp-requisition.component';
import { NewStampRequisitionComponent } from './new-stamp-requisition/new-stamp-requisition.component';
import { StampRequisitionStagingComponent } from './stamp-requisition-staging/stamp-requisition-staging.component';
import { StampRequisitionApprovalComponent } from './stamp-requisition-approval/stamp-requisition-approval.component';
import { PaymentProcessingComponent } from './payment-processing/payment-processing.component';
import { StampDeliveryComponent } from './stamp-delivery/stamp-delivery.component';

const routes: Routes = [{path: '', component: StampManagementComponent},
  {path: 'stamp-requisition', component: StampRequisitionComponent},
  {path: 'new-stamp-requisition', component: NewStampRequisitionComponent},
  {path: 'stamp-requisition-staging', component: StampRequisitionStagingComponent},
  {path: 'stamp-requisition-approval', component: StampRequisitionApprovalComponent},
  {path: 'payment-processing', component: PaymentProcessingComponent},
  {path: 'stamp-delivery', component: StampDeliveryComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StampManagementRoutingModule { }
