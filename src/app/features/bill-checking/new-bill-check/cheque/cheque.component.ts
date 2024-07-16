import { Component, OnInit } from '@angular/core';
import { basicDynamicTable } from 'src/app/core/models/basic-dynamic-table';
import { IChequeDetails, IChequeList } from 'src/app/core/models/bill';
import { IapiResponce } from 'src/app/core/models/iapi-responce';
import { BillService } from 'src/app/core/services/Bill/bill.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { TokenService } from 'src/app/core/services/Token/token.service';

@Component({
  selector: 'app-cheque',
  templateUrl: './cheque.component.html',
  styleUrls: ['./cheque.component.scss']
})
export class ChequeComponent implements OnInit {
  chequeDetails!: IChequeDetails;
  chequeTable: basicDynamicTable = {
    data: [],
    header: []
  };
  constructor(private tokenServce: TokenService, public billservice: BillService, private toastservice: ToastService) { }

  ngOnInit(): void {
    this.chequeTable.header = [
      { name: '#', key: '#' },
      { name: 'Payee Name', key: 'payeeName' },
      { name: 'Amount', key: 'amount' },
      { name: 'Cheque Type', key: 'chequeType' },
    ]
    this.billservice.getChequeDetails(this.tokenServce.selectedId).subscribe((responce: IapiResponce<IChequeDetails>) => {
      if (responce.apiResponseStatus == 1) {
        this.chequeDetails = responce.result;
        this.chequeTable.data = this.chequeDetails.chequeDetails.map((item: IChequeList) => {
          return {
            payeeName: item.payeeName,
            amount: item.amount,
            chequeType: item.chequeType
          }
        });
      }
      this.toastservice.showAlert(responce.message, responce.apiResponseStatus);
    });
  }

}
