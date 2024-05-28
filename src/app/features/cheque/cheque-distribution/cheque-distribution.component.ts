import { Component, OnInit } from '@angular/core';
import { ChequeReceive, NewChequeEntry } from 'src/app/core/models/cheque';
import {
  ActionButtonConfig,
  DynamicTable,
  DynamicTableQueryParameters,
} from 'src/app/core/models/dynamic-table';
import { ChequeDistributionService } from 'src/app/core/services/cheque/cheque-distribution.service';

@Component({
  selector: 'app-cheque-distribution',
  templateUrl: './cheque-distribution.component.html',
  styleUrls: ['./cheque-distribution.component.scss']
})
export class ChequeDistributionComponent implements OnInit {
  displayModal: boolean | undefined;
  tableData!: DynamicTable<ChequeReceive>;
  tableQueryParameters!: DynamicTableQueryParameters | any;
  tableActionButton: ActionButtonConfig<ChequeReceive>[] = [];;

  constructor(private chequedistributionService: ChequeDistributionService) { }

  ngOnInit(): void {
    this.tableActionButton = [
      {
        buttonIdentifier: 'cheque_distribute',
        class: '"p-button-raised p-button-rounded',
        icon: 'pi pi-check-circle',
        lable: 'Cheque Distribute',
      },
    ];

    this.tableQueryParameters = {
      pageSize: 10,
      pageIndex: 0,
    };
    this.getTableData();
  }

  showModal() {
    this.displayModal = true;
  }

  getTableData() {
    this.chequedistributionService.getChqueListForDistribution(this.tableQueryParameters).subscribe((response) => {
      if (response.apiResponseStatus == 1) {
        this.tableData = response.result;
      }
    });
  }

}
