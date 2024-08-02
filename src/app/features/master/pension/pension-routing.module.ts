import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PensionComponent } from './pension.component';
import { ComponentComponent } from './component/component.component';
import { PrimaryComponent } from './primary/primary.component';
import { PensionCategoryComponent } from './pension-category/pension-category.component';

const routes: Routes = [

  {path: 'component', component: ComponentComponent},
  {path: 'component', loadChildren: () => import('./component/component.module').then(m => m.ComponentModule)},
  {path: '', component:PensionComponent},
 {path: 'app-primary', component: PrimaryComponent},
  {path: 'app-pension-category', component: PensionCategoryComponent},
];






@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PensionRoutingModule { }
