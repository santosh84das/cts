import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { FromDfildData } from '../../entry.component';




interface expandedRows {
  [key: string]: boolean;
}

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: []
})

export class DetailsComponent implements OnInit {
  // declaration area
  subDivOptions: SelectItem[];
  religionOptions: SelectItem[];
  

  // constructor
  constructor(fpd: FromDfildData){
    this.subDivOptions = fpd.subDivOptions;
    this.religionOptions = fpd.religionOptions;
  }
  ngOnInit(): void {
  }

  
}
