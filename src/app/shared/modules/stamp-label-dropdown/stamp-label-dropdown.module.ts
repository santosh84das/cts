import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { StampLabelDropdownComponent } from './stamp-label-dropdown.component';



@NgModule({
  declarations: [StampLabelDropdownComponent],
  imports: [
    CommonModule,
    DropdownModule,
    FormsModule
  ], 
  exports: [StampLabelDropdownComponent]
})
export class StampLabelDropdownModule { }
