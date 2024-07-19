import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { StampCombinationDropdownComponent } from './stamp-combination-dropdown.component';



@NgModule({
  declarations: [StampCombinationDropdownComponent],
  imports: [
    CommonModule,
    DropdownModule,
    FormsModule
  ],
  exports:[StampCombinationDropdownComponent]
})
export class StampCombinationDropdownModule { }
