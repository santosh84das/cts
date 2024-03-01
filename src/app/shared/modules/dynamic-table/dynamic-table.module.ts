import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicTableComponent } from './dynamic-table.component';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';


@NgModule({
  declarations: [DynamicTableComponent],
  imports: [
    CommonModule,
    ButtonModule,
    TableModule,
    CheckboxModule
  ],
  exports:[
    DynamicTableComponent
  ]
})
export class DynamicTableModule { }
