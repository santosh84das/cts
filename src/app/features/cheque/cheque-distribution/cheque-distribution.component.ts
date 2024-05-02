import { Component, OnInit } from '@angular/core';
import { NewChequeEntry } from 'src/app/core/models/cheque';
import {
  ActionButtonConfig,
  DynamicTable,
  DynamicTableQueryParameters,
} from 'src/app/core/models/dynamic-table';
import { tokenDetails } from 'src/app/core/models/token';

@Component({
  selector: 'app-cheque-distribution',
  templateUrl: './cheque-distribution.component.html',
  styleUrls: ['./cheque-distribution.component.scss']
})
export class ChequeDistributionComponent implements OnInit {
  displayModal: boolean | undefined;
  tableData!: DynamicTable<tokenDetails>;
  tableQueryParameters!: DynamicTableQueryParameters | any;
  newChequeEntryModel!: NewChequeEntry;
  tableActionButton: ActionButtonConfig[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  showModal(){
    this.displayModal = true;
  }

}
