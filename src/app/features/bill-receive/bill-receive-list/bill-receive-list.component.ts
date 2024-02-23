import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { IBills } from 'src/app/core/models/bill';
import { BillService } from 'src/app/core/services/Bill/bill.service';
import { OnlineBillReceiveService } from 'src/app/core/services/Bill/online-bill-receive.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { ConfirmationService } from 'primeng/api';
import { TokenService } from 'src/app/core/services/Token/token.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { DatePipe } from '@angular/common';
import { Message,MessageService } from 'primeng/api';
import { jsPDF } from 'jspdf'

@Component({
  selector: 'app-bill-receive-list',
  templateUrl: './bill-receive-list.component.html',
  styleUrls: ['./bill-receive-list.component.scss'],
  providers: [ConfirmationService,MessageService]
})
export class BillReceiveListComponent implements OnInit {
  bills: IBills[][] | any;
  loading: boolean = false;
  displayMaximizable: boolean | undefined;
  messages: Message[] =[] ;
  @ViewChild('myDialog') myDialog: any; 
  constructor( private elementRef: ElementRef, private billService: BillService, private toastService: ToastService, private onlineBillReceiveService: OnlineBillReceiveService, private router: Router, private confirmationService: ConfirmationService, private tokenService: TokenService, private notificationService: NotificationService, private datePipe:DatePipe) { }

  ngOnInit(): void {
    this.allBillls();
    this.messages = [{ severity: 'success', summary: 'Success', detail: 'Token Generated Successfully' }];
  }
  allBillls() {
    this.billService.getAllBills().subscribe((response) => {
      if (response.apiResponseStatus == 1) {
        this.bills = response.result;
        console.log('the bills:',this.bills);
        
      } else {
        this.toastService.showAlert(response.message, response.apiResponseStatus);
      }
    });
  }

  confirm(event: Event | any, billId: any) {
    this.confirmationService.confirm({
      target: event.target,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // this.sendForBillReceive(billId);
        this.test();
      },
      reject: () => {
        //reject action
      }
    });
  }

  sendForBillReceive(billId: number) {
    const payloadData = {
      billId: billId,
      physicalBillDate: this.datePipe.transform(new Date(), 'dd/MM/yyyy'),
      remarks: '',
    }
    this.tokenService.generateToken(payloadData).subscribe((res) => {
      if (res.result) {
        this.onlineBillReceiveService.selectedBillId = 0;
        this.onlineBillReceiveService.selectedBillRefNo = 0;
        // this.notificationService.success(res.message, "Your Token No is: " + res.result);
        this.displayMaximizable = true;
        // this.router.navigate(['/bill-receive']);
        // return;
      }
      this.notificationService.error(res.message);
    });
  }

  test(){
    this.displayMaximizable = true;
  }

  printDialogContent(){
    const doc = new jsPDF();
    const dialogElement  = this.myDialog;;
    console.log(dialogElement)
    // Option 1: Print entire dialog content
    doc.html(dialogElement, {
      callback: () => {
        doc.save('token-slip.pdf');
      },
      windowWidth: 1000 // Adjust as needed to avoid cut-off
    })
    // const content = `
    //   <h2>Token Details</h2>
    //   <p>Token Number: 20</p>
    //   <p>Token Date:30 </p>
    //   <p>Bill Number: 40</p>
    //   <p>Bill Date:50 </p>
    //   `;

    //  doc.text(content, { align: 'center', margin: { top: 20 } }); // Center and add margin

    //  doc.save('token-slip.pdf');
  }
}
