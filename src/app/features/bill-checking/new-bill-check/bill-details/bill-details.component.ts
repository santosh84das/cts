import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
    IBillDetails,
    IOnlineBillDetailsRefNo,
    subDeatilsHead,
} from 'src/app/core/models/bill';
import { BillService } from 'src/app/core/services/Bill/bill.service';
import { TokenService } from 'src/app/core/services/Token/token.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
    selector: 'app-bill-details',
    templateUrl: './bill-details.component.html',
    styleUrls: ['./bill-details.component.scss'],
})
export class BillDetailsComponent implements OnInit {
    tokenId: number | any;
    billDetails: IBillDetails | undefined;
    subHeadDetails: subDeatilsHead[] | any;
    displayAllotment: boolean = false;
    constructor(
        public billservice: BillService,
        private toastservice: ToastService,
        private tokenServce: TokenService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.tokenId = this.tokenServce.selectedId;
        this.getBillDetails();
    }

    getBillDetails() {
        this.billservice.getBillDetails(this.tokenId).subscribe((responese) => {
            if (responese.apiResponseStatus == 1) {
                this.billDetails = responese.result;
                this.billservice.billDetails = responese.result;
                this.subHeadDetails = this.billDetails?.billDetailsDetails.subDeatilsHead;
                return;
            }
            this.toastservice.showAlert(responese.message,responese.apiResponseStatus);
            this.router.navigate(['/']);
        });
    }
    showAllotment(){
        this.displayAllotment=true;
    }
    nextStep() {
        this.router.navigate(['bill-checking/new-bill-check/objection']);
    }
}
