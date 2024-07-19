import { Component, Input, OnInit } from '@angular/core';
import { AllotmentDetails, subDeatilsHead } from 'src/app/core/models/bill';
import { BillService } from 'src/app/core/services/Bill/bill.service';
import { TokenService } from 'src/app/core/services/Token/token.service';

@Component({
  selector: 'app-allotment',
  templateUrl: './allotment.component.html',
  styleUrls: ['./allotment.component.scss']
})
export class AllotmentComponent implements OnInit {
  // @Input() subHeadDetails:subDeatilsHead |any;
  allotments!: AllotmentDetails[];
  constructor(public billservice: BillService, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.getAllotment(this.tokenService.selectedId);
  }
  getAllotment(tokenId: number) {
    this.billservice.getAllotmentDetils(tokenId).subscribe((res: any) => {
      if (res.apiResponseStatus == 1) {
        this.allotments = res.result;
        console.log(this.allotments);
        return
      }
    })
  }
}
