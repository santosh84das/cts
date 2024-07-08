import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-stamp-requisition',
  templateUrl: './new-stamp-requisition.component.html',
  styleUrls: ['./new-stamp-requisition.component.scss']
})
export class NewStampRequisitionComponent implements OnInit {

  newStampRequisition!: FormGroup
  constructor() { }
  @Output() VendorDetailsSelected = new EventEmitter<any>();

  ngOnInit(): void {
  }

  onTreasurySelected($event: any) {

  }

  onStampCombinationSelected($event: any) {
    
  }

  onVendorDetailsSelected($event: any) {
    
  }
}
