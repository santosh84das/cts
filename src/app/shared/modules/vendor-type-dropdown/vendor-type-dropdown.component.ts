import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MasterService } from 'src/app/core/services/master/master.service';
import { ToastService } from 'src/app/core/services/toast.service';
@Component({
  selector: 'app-vendor-type-dropdown',
  templateUrl: './vendor-type-dropdown.component.html',
  styleUrls: ['./vendor-type-dropdown.component.scss']
})
export class VendorTypeDropdownComponent implements OnInit {

  VendorTypeList: any[] = [];
  selectedVendorType:any;
  @Output() vendorTypeSelected = new EventEmitter<string>();

  constructor(private masterService: MasterService, private toastService: ToastService,) { }
  ngOnInit(): void {
    this.masterService.getVendorTypes().subscribe((response) => {
      if (response.apiResponseStatus == 1) {
        this.VendorTypeList = response.result
        console.log(this.VendorTypeList);
      } else {
        this.toastService.showError(response.message);
      }
    })
  }

  onSelected() {
    console.log(this.selectedVendorType);
    
    this.vendorTypeSelected.emit(this.selectedVendorType.vendorType);
  }
}
