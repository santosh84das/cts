import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pay-mandate-shortlist',
  templateUrl: './pay-mandate-shortlist.component.html',
  styleUrls: ['./pay-mandate-shortlist.component.scss']
})
export class PayMandateShortlistComponent implements OnInit {
  stateOptions: any[] = [{label: 'Current Financial Year', value: '1'}, {label: 'Previous Financial Year  ', value: '2'}];
  value:any = '1';
  isPaymentSelected: boolean = true;
  loading:boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
