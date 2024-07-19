import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { DatatableSkeletonComponent } from './datatable-skeleton.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [DatatableSkeletonComponent],
  imports: [
    CommonModule,
    FormsModule,
    SkeletonModule,
    TableModule,
  ],
  exports: [DatatableSkeletonComponent]
})
export class DatatableSkeletonModule { }
