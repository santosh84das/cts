import { Component, OnInit, ViewChild } from '@angular/core';
import { ChequeIndentComponent } from './cheque-indent/cheque-indent.component';

@Component({
  selector: 'app-cheque-indent-invoice',
  templateUrl: './cheque-indent-invoice.component.html',
  styleUrls: ['./cheque-indent-invoice.component.scss']
})
export class ChequeIndentInvoiceComponent implements OnInit {

  @ViewChild(ChequeIndentComponent) addIndent!: ChequeIndentComponent;

  constructor() { }

  ngOnInit(): void {
  }

  callChequeIndent() {
    
    this.addIndent;
    console.log('hi');

  }


}
