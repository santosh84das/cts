import { Component, OnInit } from '@angular/core';
import { basicDynamicTable } from 'src/app/core/models/basic-dynamic-table';
import { ByTransfer, ByTransferDetails } from 'src/app/core/models/bill';
import { BillService } from 'src/app/core/services/Bill/bill.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { TokenService } from 'src/app/core/services/Token/token.service';

@Component({
  selector: 'app-by-transfer',
  templateUrl: './by-transfer.component.html',
  styleUrls: ['./by-transfer.component.scss']
})
export class ByTransferComponent implements OnInit {
  byTransferData!: ByTransferDetails;
  byTransfersTable: basicDynamicTable = {
    header: [],
    data: [],
  };
  constructor(private billService: BillService, private toastService: ToastService, private tokenServce: TokenService) { }

  ngOnInit(): void {
    this.getByTransferData();
    this.byTransfersTable.header = [
      { name: 'BT Sl. No.', key: 'btSlNo' },
      { name: 'Treasury BT Head', key: 'btHead' },
      { name: 'Treasury BT Description', key: 'btDescription' },
      { name: 'Amount', key: 'amount' },
    ]
  }

  getByTransferData() {
    this.billService.getByTransferDetails(this.tokenServce.selectedId).subscribe(response => {
      if (response.apiResponseStatus == 1) {
        this.byTransferData = response.result;
        this.byTransfersTable.data = this.byTransferData.byTransfers.map((item: ByTransfer) => {
          return {
            btSlNo: item.btSerial,
            btHead: item.hoa,
            btDescription: item.desc,
            amount: item.amount
          }
        });
        return;
      }
      this.toastService.showAlert(response.message, response.apiResponseStatus);
    })
  }
}
