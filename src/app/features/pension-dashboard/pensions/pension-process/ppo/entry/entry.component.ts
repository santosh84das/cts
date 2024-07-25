import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

// this fild for common areas where required sem felid or data
export class FromDfildData{
  subDivOptions: SelectItem[];
  religionOptions: SelectItem[];

  constructor(){
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

}
