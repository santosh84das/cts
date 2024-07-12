import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { basicDynamicTable, tfoot } from 'src/app/core/models/basic-dynamic-table';
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
    subHeadTabledetails:basicDynamicTable = {
        header: [],
        data: [],
    }; 
    subHeadTableFooterDetails: tfoot={total: 0};// details
    constructor(
        public billservice: BillService,
        private toastservice: ToastService,
        private tokenServce: TokenService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.tokenId = this.tokenServce.selectedId;
        this.getBillDetails();
        this.subHeadTabledetails.header = [
            { name: '#' ,key: '#' },
            { name: 'Sub Detail',key: 'subHead' },
            { name: 'Description',key: 'description' },
            { name: 'Amount',key: 'amount' },
        ];
        
    }

    getBillDetails() {
        this.billservice.getBillDetails(this.tokenId).subscribe((responese) => {
            if (responese.apiResponseStatus == 1) {
                this.billDetails = responese.result;
                this.billservice.billDetails = responese.result;
                this.subHeadDetails = this.billDetails?.billDetailsDetails.subDeatilsHead;
                if(this.billDetails?.billDetailsDetails?.subDeatilsTotalAmount){
                    this.subHeadTableFooterDetails = {
                        total: this.billDetails?.billDetailsDetails?.subDeatilsTotalAmount
                    };
                }
                this.subHeadTabledetails.data = this.subHeadDetails.map((x: subDeatilsHead) => {
                    return{
                        subHead:x.subDeatils,
                        description:x.description,
                        amount:x.amount
                    }
                })
                console.log('->',this.subHeadTabledetails);	
                
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
