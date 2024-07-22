import { Component, Input, OnInit } from '@angular/core';
import { subDeatilsHead } from 'src/app/core/models/bill';
import { BillService } from 'src/app/core/services/Bill/bill.service';

@Component({
  selector: 'app-allotment',
  templateUrl: './allotment.component.html',
  styleUrls: ['./allotment.component.scss']
})
export class AllotmentComponent implements OnInit {
  @Input() subHeadDetails:subDeatilsHead |any;
  // allotments:any;
  constructor(public billservice: BillService) {
    // console.log('bill', this.billservice.billDetails?.billDetailsDetails?.subDeatilsHead);
    
  }

  ngOnInit(): void {

  }

}
