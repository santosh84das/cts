import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ChipsModule } from "primeng/chips";
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { RatingModule } from 'primeng/rating';
import { PensionBillComponent } from './pension-bill.component';

@NgModule({
  declarations: [
    PensionBillComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    ReactiveFormsModule,
    DropdownModule,
    FormsModule,
    ChipsModule,
    ToastModule,
    RatingModule,
    TableModule,
  ]
})
export class PensionBillModule { }
