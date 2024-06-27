import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StampStrongRoomRoutingModule } from './stamp-strong-room-routing.module';
import { StampStrongRoomComponent } from './stamp-strong-room.component';
import { OptionCardModule } from 'src/app/shared/modules/option-card/option-card.module';


@NgModule({
  declarations: [StampStrongRoomComponent],
  imports: [
    CommonModule,
    OptionCardModule,
    StampStrongRoomRoutingModule
  ]
})
export class StampStrongRoomModule { }
