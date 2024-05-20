import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorComponent } from './vendor.component';
import { VendorRoutingModule } from './vendor-routing.module';
import { DropdownModule } from 'primeng/dropdown';
import { FormGroup } from '@angular/forms';



@NgModule({
  declarations: [VendorComponent],
  imports: [
    CommonModule,
    DropdownModule,
    VendorRoutingModule,
    FormGroup
  ]
})
export class VendorModule { }
