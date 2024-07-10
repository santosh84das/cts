import { Component, OnInit } from '@angular/core';
import { ActionButtonConfig, DynamicTable, DynamicTableQueryParameters } from 'mh-prime-dynamic-table/lib/mh-prime-dynamic-table-interface';

@Component({
  selector: 'app-challan',
  templateUrl: './challan.component.html',
  styleUrls: ['./challan.component.scss']
})
export class ChallanComponent implements OnInit {

  tableActionButton: ActionButtonConfig[] = [];
  tableData!: DynamicTable<any>;
  tableQueryParameters!: DynamicTableQueryParameters | any;
  constructor() { }

  ngOnInit(): void {
  }

}
