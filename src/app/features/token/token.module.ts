import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TokenRoutingModule } from './token-routing.module';
import { TokenComponent } from './token.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { TokenListModule } from 'src/app/shared/modules/token-list/token-list.module';


@NgModule({
  declarations: [TokenComponent],
  imports: [
    CommonModule,
    TokenRoutingModule,
    ButtonModule,
    CardModule,
    TableModule,
    TokenListModule
  ]
})
export class TokenModule { }
