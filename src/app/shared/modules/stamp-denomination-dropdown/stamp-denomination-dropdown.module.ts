import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { StampDenominationDropdownComponent } from './stamp-denomination-dropdown.component';


@NgModule({
  declarations: [StampDenominationDropdownComponent],
  imports: [
    CommonModule,
    DropdownModule,
    FormsModule
  ],
  exports: [StampDenominationDropdownComponent]
})
export class StampDenominationDropdownModule { }
