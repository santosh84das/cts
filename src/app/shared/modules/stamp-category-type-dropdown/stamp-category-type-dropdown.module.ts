import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { StampCategoryTypeDropdownComponent } from './stamp-category-type-dropdown.component';



@NgModule({
  declarations: [StampCategoryTypeDropdownComponent],
  imports: [
    CommonModule,
    DropdownModule,
    FormsModule
  ],
  exports:[StampCategoryTypeDropdownComponent]
})

export class StampCategoryTypeDropdownModule { }
