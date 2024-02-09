import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IBills } from 'src/app/core/models/bill';
import { BillService } from 'src/app/core/services/Bill/bill.service';
import { OnlineBillReceiveService } from 'src/app/core/services/Bill/online-bill-receive.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-bill-receive-list',
  templateUrl: './bill-receive-list.component.html',
  styleUrls: ['./bill-receive-list.component.scss']
})
export class BillReceiveListComponent implements OnInit {
  bills:IBills[][] | any;
  loading:boolean = false;
  constructor(private billService:BillService,private toastService:ToastService,private onlineBillReceiveService:OnlineBillReceiveService,private router:Router) { }

  ngOnInit(): void {
    this.allBillls();
  }
  allBillls(){
    this.billService.getAllBills().subscribe((response)=>{
      if(response.apiResponseStatus==1){
          this.bills = response.result;
      }else{
        this.toastService.showAlert(response.message,response.apiResponseStatus);
      }
    });
  }
  sendForBillReceive(refNo:number,billId:number){
    this.onlineBillReceiveService.selectedBillRefNo = refNo;
    this.onlineBillReceiveService.selectedBillId = billId;
    this.router.navigate(['/bill-receive/online']);
  }
}
