import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReturnMemoRoutingModule } from './return-memo-routing.module';
import { ReturnMemoComponent } from './return-memo.component';
import { TokenListModule } from 'src/app/shared/modules/token-list/token-list.module';
import { GenerateReturnMemoComponent } from './generate-return-memo/generate-return-memo.component';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [ReturnMemoComponent, GenerateReturnMemoComponent],
  imports: [
    CommonModule,
    ReturnMemoRoutingModule,
    TokenListModule,
    CardModule,
    ButtonModule,
    DialogModule
  ]
})
export class ReturnMemoModule { }
