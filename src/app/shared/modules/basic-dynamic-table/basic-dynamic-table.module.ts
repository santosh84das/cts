import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicDynamicTableComponent } from './basic-dynamic-table.component';



@NgModule({
  declarations: [BasicDynamicTableComponent],
  imports: [
    CommonModule
  ],
  exports: [BasicDynamicTableComponent]
})
export class BasicDynamicTableModule { }
