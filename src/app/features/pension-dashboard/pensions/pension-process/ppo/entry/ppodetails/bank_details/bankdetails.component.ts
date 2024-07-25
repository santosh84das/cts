import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';


@Component({
  selector: 'app-bank-details',
  templateUrl: './bankdetails.component.html',
  styleUrls: []
})
export class BankDetails implements OnInit {

  subDivOptions: SelectItem[];
  religionOptions: SelectItem[];
  constructor() {
    this.subDivOptions = [
      { label: 'Sub Div 1', value: 'subDiv1' },
      { label: 'Sub Div 2', value: 'subDiv2' },
      { label: 'Sub Div 3', value: 'subDiv3' }
    ];

    this.religionOptions = [
      { label: 'Hindu', value: 'hindu' },
      { label: 'Muslim', value: 'muslim' },
      { label: 'Christian', value: 'christian' },
      { label: 'Other', value: 'other' }
    ];
  }
  ngOnInit(): void {
  }

}