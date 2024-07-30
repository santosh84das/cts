import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PensionComponent } from './pension.component';
import { ComponentComponent } from './component/component.component';

const routes: Routes = [
  {path: 'component', component: ComponentComponent},
  {path: 'component', loadChildren: () => import('./component/component.module').then(m => m.ComponentModule)},
  {path: '', component:PensionComponent},
  ];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PensionRoutingModule { }
