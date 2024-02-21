import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { IBillCheck, IBillDetails, IRetunMemoBillDetils, IReturnMemoCount, ISelectedObjection } from 'src/app/core/models/bill';
import { tokenDetails } from 'src/app/core/models/token';
import { BillService } from 'src/app/core/services/Bill/bill.service';
import { TokenService } from 'src/app/core/services/Token/token.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { StatusType, TokenStatusSlug } from 'src/app/core/enum/common';
import { ObjectionService } from 'src/app/core/services/objection.service';
import { TokenWithObjections } from 'src/app/core/models/objection';

@Component({
  selector: 'app-return-memo',
  templateUrl: './return-memo.component.html',
  styleUrls: ['./return-memo.component.scss']
})
export class ReturnMemoComponent implements OnInit {
  StatusType = StatusType;
  TokenStatusSlug = TokenStatusSlug;
  memoCont: IReturnMemoCount = {
    awatingReturnMemo: 0,
    generatedReturnMemo: 0
  };
  showReturnMemoModal: boolean = false;
  selectedObjections: ISelectedObjection[] = [];
  billDetails: IRetunMemoBillDetils | any;
  private subscription: Subscription | any;
  isActive: boolean = false;
  memoType: string = TokenStatusSlug.ObjectedByTreasuryOfficer;
  constructor(public tokenServices: TokenService, private objectionService: ObjectionService, public billservice: BillService, private toastservice: ToastService, private notify: NotificationService, private router: Router,) { }

  ngOnInit(): void {
    this.subscription = this.tokenServices.getActionButtonObservable().subscribe((data) => {
      this.setToGenerateReturnMemo();
    });
    this.countReturnMemo();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  setToGenerateReturnMemo() {
    this.showReturnMemoModal = true;
    this.billservice.getReturnMemoBillDetails(this.tokenServices.selectedId).subscribe((responese) => {
      if (responese.apiResponseStatus == 1) {
        this.billDetails = responese.result;

        this.tokenObjection(this.tokenServices.selectedId);
      }
    });
  }
  countReturnMemo() {
    this.billservice.getReturnMemoCount().subscribe((responese) => {
      if (responese.apiResponseStatus == 1) {
        this.memoCont = responese.result;

      }
    });
  }
  test() {
    this.notify.successfulReload('aaaa');
  }
  tokenObjection(tokenId: number) {
    this.objectionService.getTokenObjections(tokenId).subscribe((response) => {
      if (response.apiResponseStatus == 1) {
        // this.tokenObjections = response.result;
        this.selectedObjections = response.result.map((tokenObjections: TokenWithObjections) => {
          return {
            id: tokenObjections.objectionId,
            description: tokenObjections.objectionDescription,
            remark: tokenObjections.objectionRemark,
            exiestObjectionId: tokenObjections.id,
            objectionType: tokenObjections.objectionType,
            objectionBy: tokenObjections.objectionBy,
            isOverruled: tokenObjections.isOverruled,
            OverruledBy: tokenObjections.objectionBy,
          }
        });
        console.log('null', this.selectedObjections);

        // const currentlySlectedGobalObjections: IObjection[] = response.result.filter((r: { objectionType: string; }) => r.objectionType == "Global").map((tokenObjections: TokenWithObjections) => {
        //     return {
        //         id: tokenObjections.objectionId,
        //         description: tokenObjections.objectionDescription
        //     }
        // });
        // const stringifiedArray = currentlySlectedGobalObjections.map((elm: IObjection) => { return JSON.stringify(elm) });
        // this.gobalObjections = this.gobalObjections.filter((gobalObjection: IObjection) => !stringifiedArray.includes(JSON.stringify(gobalObjection)));
        // this.setSubmitButtonLabel();
        return;
      }
      this.toastservice.showAlert(response.message, response.apiResponseStatus);
    });
  }
  generateReturnMemo() {
    this.billDetails = {
      tokenId: this.tokenServices.selectedId,
      referenceNo: this.tokenServices.selectedTokenRef
    }
    this.billservice.saveReturnMemo(this.billDetails).subscribe((response) => {
      if (response.apiResponseStatus == 1) {
        this.notify.successfulReload('Return Memo Generated');
        this.showReturnMemoModal = false;
        this.countReturnMemo();
        this.router.navigate(['/return-memo']);
      }
      this.toastservice.showAlert(response.message, response.apiResponseStatus);
    });
  }

  closeButton(event: any) {
    this.router.navigate(["/"]);
  }
}
