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
  paymandateShortlist: Paymandate[] = [];
  selectedPaymandates: Paymandate[] = [];
  constructor(private paymandateservice: PaymandateService, public billservice: BillService,) { }

  ngOnInit(): void {
    this.allpaymandateShortlist();
  }

  allpaymandateShortlist() {
    this.paymandateservice.getPaymandateShortlist().subscribe((response) => {
      if (response.apiResponseStatus == 1) {
        this.paymandateShortlist = response.result;
        console.log('->>>', this.paymandateShortlist);

      } else {

      }
    })
  }

  selectPaymandate(paymandate: any) {
    if (!this.selectedPaymandates) {
      this.selectedPaymandates = []; 
    }
    this.selectedPaymandates.push(paymandate);
  }

  updateSelectedPaymandates(paymandate: any) {
    if (!this.selectedPaymandates) {
      this.selectedPaymandates = []; 
    }
    if (paymandate.selected) {
      this.selectedPaymandates.push(paymandate);
    } else {
      const index = this.selectedPaymandates.findIndex(item => item.tokenId === paymandate.tokenId);
      if (index !== -1) {
        this.selectedPaymandates.splice(index, 1);
      }
    }
  }

  dataSave() {
    if (this.selectedPaymandates && this.selectedPaymandates.length > 0) {
      console.log(this.selectedPaymandates);
      const payload = {
        tokenId: this.selectedPaymandates[0].tokenId,
        calendarDate: this.selectedPaymandates[0].selectedDate,
      };
      console.log(payload);
    } else {
      console.error('No paymandates selected.');
    }
  }

}
