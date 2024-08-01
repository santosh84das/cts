import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SearchPopupComponent } from './search-popup.component'


@NgModule({
  declarations: [
    SearchPopupComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
   
   ]
})
export class SearchPopupModule { 
}
