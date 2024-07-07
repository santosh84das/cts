import { Component, OnInit } from '@angular/core';
import { DynamicTable, DynamicTableQueryParameters } from 'mh-prime-dynamic-table/lib/mh-prime-dynamic-table-interface';
import { ActionButtonConfig } from 'src/app/core/models/dynamic-table';

@Component({
  selector: 'app-stamp-requisition-staging',
  templateUrl: './stamp-requisition-staging.component.html',
  styleUrls: ['./stamp-requisition-staging.component.scss']
})
export class StampRequisitionStagingComponent implements OnInit {

  listType: string = 'new'
  tableData!: DynamicTable<any>;
  tableActionButton: ActionButtonConfig[] = [];
  tableQueryParameters!: DynamicTableQueryParameters | any;
  constructor() { }

  ngOnInit(): void {
  }

  changeDynamicTable(listType: string) {
    this.listType = listType;
    this.tableQueryParameters = {
      pageSize: 10,
      pageIndex: 0,
    };
    if (listType === 'new') {
      this.tableActionButton = [
        {
          buttonIdentifier: 'reject',
          class: 'p-button-danger p-button-sm',
          icon: 'pi pi-times',
          lable: 'Reject',
        },
        {
          buttonIdentifier: 'edit',
          class: 'p-button-warning p-button-sm',
          icon: 'pi pi-file-edit',
          lable: 'Edit & Approve',
        },
      ];
      // this.getAllNewRequisitions();
    } else if (listType === 'approvedByClerk') {
      this.tableActionButton = [
        // {
        //   buttonIdentifier: 'invoice-received',
        //   class: 'p-button-sm',
        //   icon: 'pi pi-inbox',
        //   lable: 'Receive',
        // },
        {
          buttonIdentifier: 'edit',
          class: 'p-button-info p-button-sm',
          icon: 'pi pi-info-circle',
          lable: 'Edit & Approve',
        },
      ];
      // this.getAllApprovedByClerkRequisitions();
    }
  }

  handleButtonClick($event: any) {

  }
}
