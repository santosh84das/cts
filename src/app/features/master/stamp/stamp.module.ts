import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StampRoutingModule } from './stamp-routing.module';
import { StampComponent } from './stamp.component';
import { LabelComponent } from './label/label.component';
import { OptionCardModule } from 'src/app/shared/modules/option-card/option-card.module';
import { CommonHeaderModule } from 'src/app/shared/modules/common-header/common-header.module';
import { ButtonModule } from 'primeng/button';
import { DynamicTableModule } from 'src/app/shared/modules/dynamic-table/dynamic-table.module';
import { CategoryComponent } from './category/category.component';
import { TypeComponent } from './type/type.component';
import { VendorComponent } from './vendor/vendor.component';
import { DiscountDetailsComponent } from './discount-details/discount-details.component';


@NgModule({
  declarations: [
    StampComponent,
    LabelComponent,
    CategoryComponent,
    TypeComponent,
    VendorComponent,
    DiscountDetailsComponent
  ],
  imports: [
    CommonModule,
    StampRoutingModule,
    OptionCardModule,
    ButtonModule,
    DynamicTableModule,
    CommonHeaderModule
  ]
})
export class StampModule { }
