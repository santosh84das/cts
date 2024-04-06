import { Component, OnInit, ViewChild } from '@angular/core';
import { ChequeIndentComponent } from './cheque-indent-invoice/cheque-indent/cheque-indent.component';

@Component({
  selector: 'app-cheque',
  templateUrl: './cheque.component.html',
  styleUrls: ['./cheque.component.scss']
})
export class ChequeComponent implements OnInit {
  
  constructor() { }

  ngOnInit(): void {
  }

}
