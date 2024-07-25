import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { FromDfildData } from '../../entry.component';


interface expandedRows {
  [key: string]: boolean;
}

@Component({
  selector: 'app-bank-details',
  templateUrl: './bankdetails.component.html',
  styleUrls: []
})

export class BankDetailsComponent implements OnInit {
    // declaration area
    religionOptions: SelectItem[];
    subDivOptions: SelectItem[];

    constructor(fdp: FromDfildData){

    

    this.subDivOptions = fdp.subDivOptions;
    this.religionOptions = fdp.religionOptions;
    }
    ngOnInit(): void {
    }
}