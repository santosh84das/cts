import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { BillInfo } from 'src/app/core/models/bill';
import { BillService } from 'src/app/core/services/Bill/bill.service';
import { TokenService } from 'src/app/core/services/Token/token.service';
import { ToastService } from 'src/app/core/services/toast.service';


@Component({
  selector: 'app-new-bill-check',
  templateUrl: './new-bill-check.component.html',
  styleUrls: ['./new-bill-check.component.scss']
})
export class NewBillCheckComponent implements OnInit {
  steperItems: MenuItem[] = [];
  billInfo!: BillInfo[];
  currentStepIndex = 0;
  initSteperItems: MenuItem[]=[];
  constructor(private router: Router, private billService: BillService, private toastservice: ToastService,private tokenServce: TokenService) { }

  ngOnInit(): void {
    this.billInfo = [
      {target:'bill'},
      {target:'allotment'},
      {target:'obj'},
    ];
    this.configSteperItems();
    this.initSteperItems = [
      { id: '1', title: 'Bill Details', label: 'Comprehensive Bill Overview', target: 'bill', routerLink: 'bill-details', visible: true, escape: false },
      { id: '2', title: 'Allotment', label: 'Balance Overview', routerLink: 'allotment', target: 'allotment', visible: false, escape: false },
      { id: '3', title: 'By-Transfer', routerLink: 'by-transfer', target: 'bt', visible: false, escape: false },
      { id: '4', title: 'PL-Transfer', routerLink: 'pl-transfer', target: 'pl', visible: false, escape: false },
      { id: '5', title: 'ECS/NEFT', routerLink: 'ecs-neft', target: 'ecs', visible: false, escape: false },
      { id: '6', title: 'Cheque', routerLink: 'cheque', target: 'cheque', visible: false, escape: false },
      { id: '7', title: 'List Of Objection', routerLink: 'objection', target: 'obj', visible: false, escape: false },
    ];
  }
  configSteperItems() {
    this.billService.getBillInfo(this.tokenServce.selectedId).subscribe((response) => {
      if (response.apiResponseStatus == 1) {
        this.billInfo.push(...response.result);
        console.log(this.billInfo);
        let targetsToKeep = this.billInfo.map(item => item.target);
         this.steperItems = this.initSteperItems.filter(item => item.target && targetsToKeep.includes(item.target));

      }
      this.toastservice.showAlert(response.message, response.apiResponseStatus);
    });
  }
  backStep() {
    if (this.currentStepIndex > 0) {
      this.steperItems[this.currentStepIndex].visible = false;
      this.currentStepIndex--;
      this.steperItems[this.currentStepIndex].visible = true;
      this.steperItems[this.currentStepIndex].escape = false;
      this.router.navigate(['/bill-checking/new-bill-check/' + this.steperItems[this.currentStepIndex].routerLink]);
    }
  }
  nextStep() {
    if (this.steperItems.length > this.currentStepIndex + 1) {
      this.steperItems[this.currentStepIndex].visible = false;
      this.steperItems[this.currentStepIndex].escape = true;
      this.currentStepIndex++;
      this.steperItems[this.currentStepIndex].visible = true;
      this.router.navigate(['/bill-checking/new-bill-check/' + this.steperItems[this.currentStepIndex].routerLink]);
    }
  }
}
