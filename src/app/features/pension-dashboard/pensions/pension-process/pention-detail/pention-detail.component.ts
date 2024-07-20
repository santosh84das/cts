import { Component } from '@angular/core';


@Component({
  selector: 'app-pention-detail',
  templateUrl: './pention-detail.component.html',
  styleUrls: ['./pention-detail.component.scss']
})
export class PentionDetailComponent  {

  constructor() { }

  selectedMode: any = null;



  dropdownItems = [
      { name: 'Treasury', code: 'Treasury' },
      { name: 'Option 2', code: 'Option 2' },
      { name: 'Option 3', code: 'Option 3' }
  ];

  cities1: any[] = [];

  cities2: any[] = [];

  city1: any = null;

  city2: any = null;

}
