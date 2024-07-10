import { Component, OnInit } from '@angular/core';
import { ActionButtonConfig, DynamicTable, DynamicTableQueryParameters } from 'mh-prime-dynamic-table/lib/mh-prime-dynamic-table-interface';

@Component({
  selector: 'app-stamp-requisition-approval',
  templateUrl: './stamp-requisition-approval.component.html',
  styleUrls: ['./stamp-requisition-approval.component.scss']
})
export class StampRequisitionApprovalComponent implements OnInit {

  tableActionButton: ActionButtonConfig[] = [];
  tableData!: DynamicTable<any>;
  tableQueryParameters!: DynamicTableQueryParameters | any;
  constructor() { }

  ngOnInit(): void {
  }

  handleButtonClick($event: any) {
    switch ($event.buttonIdentifier) {
      case 'requisition-reject':
        break;
      case 'requisition-edit':
     
        break;
      case 'requisition-details':
       
        break;
    }
  }
}
