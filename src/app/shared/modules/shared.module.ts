import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirstLetterPipe } from 'src/app/core/pipe/first-letter.pipe';
import { NumberToWordsPipe } from 'src/app/core/pipe/number-to-words.pipe';
import { StampIndentInvoiceFormComponent } from './stamp-indent-invoice-form/stamp-indent-invoice-form.component';

@NgModule({
  declarations: [
    FirstLetterPipe,
    NumberToWordsPipe,
    StampIndentInvoiceFormComponent,
  ],
  imports: [
    CommonModule
  ],
  exports:[
    FirstLetterPipe,
    NumberToWordsPipe
  ]
})
export class SharedModule { }
