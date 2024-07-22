import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LifeCertificateComponent } from './life-certificate.component';
import { FieldsetModule } from 'primeng/fieldset';
import { RadioButtonModule } from 'primeng/radiobutton';
import {ButtonModule} from 'primeng/button';


const routes: Routes = [
  { path: '', component: LifeCertificateComponent },
];

@NgModule({
  declarations: [
    LifeCertificateComponent,
],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FieldsetModule,
    RadioButtonModule,
    ButtonModule,
    RouterModule.forChild(routes),
  ],
})
export class LifeCertificateModule {}
