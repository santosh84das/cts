import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { VendorDetailsDropdownComponent } from './vendor-details-dropdown.component';



@NgModule({
  declarations: [VendorDetailsDropdownComponent],
  imports: [
    CommonModule,
    DropdownModule,
    FormsModule
  ],
  exports: [VendorDetailsDropdownComponent]
})
export class VendorDetailsDropdownModule { }
