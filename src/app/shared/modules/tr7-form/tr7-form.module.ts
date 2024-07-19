import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tr7FormComponent } from './tr7-form.component';
import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [Tr7FormComponent],
  imports: [
    CommonModule,
    ButtonModule,
  ], 
  exports: [Tr7FormComponent]
})
export class Tr7FormModule { }
