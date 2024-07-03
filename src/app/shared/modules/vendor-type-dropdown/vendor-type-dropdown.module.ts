import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VendorTypeDropdownComponent } from './vendor-type-dropdown.component';
import { DropdownModule } from 'primeng/dropdown';



@NgModule({
  declarations: [VendorTypeDropdownComponent],
  imports: [
    CommonModule,
    DropdownModule,
    FormsModule
  ],
  exports:[VendorTypeDropdownComponent]
})
export class VendorTypeDropdownModule { }
