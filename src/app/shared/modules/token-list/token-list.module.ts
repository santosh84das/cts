import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { TokenListComponent } from './token-list.component';
import {CalendarModule} from 'primeng/calendar';


@NgModule({
  declarations: [TokenListComponent],
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    TableModule,
    CalendarModule
  ],
  exports:[
    TokenListComponent
  ]
})
export class TokenListModule { }
