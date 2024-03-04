import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicTableComponent } from './dynamic-table.component';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { MessagesModule } from 'primeng/messages';
import {DividerModule} from 'primeng/divider';
@NgModule({
  declarations: [DynamicTableComponent],
  imports: [
    CommonModule,
    ButtonModule,
    TableModule,
    CheckboxModule,
    DropdownModule,
    MessagesModule,
    DividerModule
  ],
  exports:[
    DynamicTableComponent
  ]
})
export class DynamicTableModule { }
