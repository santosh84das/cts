import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import {DividerModule} from 'primeng/divider';

@NgModule({
  declarations: [],
  exports:[RouterModule],
  imports: [
    CommonModule,
    TableModule,
    DividerModule
  ]
})
export class BillDetailsModule { }
