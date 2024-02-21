import { Component, OnInit } from '@angular/core';
import { Paymandate } from 'src/app/core/models/paymandate';
import { PaymandateService } from 'src/app/core/services/paymandate/paymandate.service';
import { BillService } from 'src/app/core/services/Bill/bill.service';




@Component({
  selector: 'app-pay-mandate-shortlist',
  templateUrl: './pay-mandate-shortlist.component.html',
  styleUrls: ['./pay-mandate-shortlist.component.scss']
})
export class PayMandateShortlistComponent implements OnInit {
  stateOptions: any[] = [{ label: 'Current Financial Year', value: '1' }, { label: 'Previous Financial Year  ', value: '2' }];
  value: any = '1';
  isPaymentSelected: boolean = true;
  loading: boolean = false;
  paymandateShortlist: Paymandate []=[];
  constructor(private paymandateservice: PaymandateService, public billservice: BillService,) { }

  ngOnInit(): void {
    this.allpaymandateShortlist();
  }

  allpaymandateShortlist() {
    this.paymandateservice.getPaymandateShortlist().subscribe((response) => {
      if (response.apiResponseStatus == 1) {
        this.paymandateShortlist = response.result;
        console.log('->>>',this.paymandateShortlist);
        
      } else {

      }
    })
  }

}
