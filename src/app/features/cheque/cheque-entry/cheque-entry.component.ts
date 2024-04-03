import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cheque-entry',
  templateUrl: './cheque-entry.component.html',
  styleUrls: ['./cheque-entry.component.scss']
})
export class ChequeEntryComponent implements OnInit {


  displayModal: boolean | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  addCheque(){
    console.log('hello');
    
  }

  showDialog(){
    this.displayModal=true;
  }

}
