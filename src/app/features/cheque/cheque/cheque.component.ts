import { Component, OnInit, ViewChild } from '@angular/core';
import { ChequeIndentComponent } from './cheque-indent/cheque-indent.component';

@Component({
  selector: 'app-cheque',
  templateUrl: './cheque.component.html',
  styleUrls: ['./cheque.component.scss']
})
export class ChequeComponent implements OnInit {

  @ViewChild(ChequeIndentComponent) addIndent!: ChequeIndentComponent;

  constructor() { }

  ngOnInit(): void {
  }

  callChequeIndent() {
    
    this.addIndent;
    console.log('hi');

  }


}
