import { Component, Input, OnInit } from '@angular/core';
import { basicDynamicTable, tfoot } from 'src/app/core/models/basic-dynamic-table';

@Component({
  selector: 'app-basic-dynamic-table',
  templateUrl: './basic-dynamic-table.component.html',
  styleUrls: ['./basic-dynamic-table.component.scss']
})
export class BasicDynamicTableComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input()
  tableData!: basicDynamicTable;

  @Input()
  tfoot!: tfoot;
}
