import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { IBillCheck, IBillDetails } from 'src/app/core/models/bill';
import { tokenDetails } from 'src/app/core/models/token';
import { BillService } from 'src/app/core/services/Bill/bill.service';
import { TokenService } from 'src/app/core/services/Token/token.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-return-memo',
  templateUrl: './return-memo.component.html',
  styleUrls: ['./return-memo.component.scss']
})
export class ReturnMemoComponent implements OnInit {
  showReturnMemoModal: boolean = false;
  billDetails: IBillCheck | any;
  private subscription: Subscription |any;
  constructor(public tokenServices: TokenService, public billservice: BillService, private toastservice: ToastService, private notify: NotificationService,  private router: Router, ) { }

  ngOnInit(): void {
    this.subscription = this.tokenServices.getActionButtonObservable().subscribe((data) => {
      this.setToGenerateReturnMemo();
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  setToGenerateReturnMemo() {
    this.showReturnMemoModal = true;
    this.billservice.getBillDetails(this.tokenServices.selectedId).subscribe((responese) => {
      if (responese.apiResponseStatus == 1) {
        this.billservice.billDetails = responese.result;
      }
    });
  }

  generateReturnMemo() {
    this.billDetails = {
      tokenId: this.tokenServices.selectedId,
      referenceNo: this.tokenServices.selectedTokenRef
    }
    this.billservice.saveReturnMemo(this.billDetails).subscribe((response) => {
      if (response.apiResponseStatus == 1) {
        this.notify.success(response.message,'Return Memo Generated');
        this.showReturnMemoModal=false;
        this.router.navigate(['/return-memo']);
      }
      this.toastservice.showAlert(response.message, response.apiResponseStatus);
    });
  }
}
