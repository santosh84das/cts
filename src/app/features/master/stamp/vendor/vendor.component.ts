import { Component, OnInit } from '@angular/core';
import { ActionButtonConfig, DynamicTable, DynamicTableQueryParameters } from 'src/app/core/models/dynamic-table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/core/services/toast.service';
import { VendorService } from 'src/app/core/services/stamp/vendor.service';
import { convertDate } from 'src/utils/dateConversion';
import { AddStampVendors, GetStampVendors } from 'src/app/core/models/stamp';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss']
})
export class VendorComponent implements OnInit {
  vendorType!: string;
  VendorDetailsEntryForm!: FormGroup;
  displayInsertModal: boolean | undefined;
  tableActionButton: ActionButtonConfig[] = [];
  tableData!: DynamicTable<GetStampVendors>;
  tableQueryParameters!: DynamicTableQueryParameters | any;
  vendorEntryPayload!: AddStampVendors;

  constructor(
    private fb: FormBuilder,
    private VendorService: VendorService,
    private toastService: ToastService,
  ) { }

  ngOnInit(): void {
    this.initializeForms();

    this.tableActionButton = [
      {
        buttonIdentifier: 'delete',
        class: 'p-button-danger p-button-sm',
        icon: 'pi pi-trash',
        lable: 'Delete',
      },
    ];

    this.tableQueryParameters = {
      pageSize: 10,
      pageIndex: 0,
    };

    this.getAllStampVendors();
  }

  initializeForms() {
    this.VendorDetailsEntryForm = this.fb.group({
      panNumber: ['', [Validators.required, Validators.pattern('[A-Z]{5}[0-9]{4}[A-Z]{1}')]],
      licenseNo: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      address: ['', Validators.required],
      effectiveFrom: ['', Validators.required],
      validUpto: ['', Validators.required],
    });
  }

  getAllStampVendors() {
    this.VendorService.getStampVendorList(this.tableQueryParameters).subscribe((response) => {
      if (response.apiResponseStatus == 1) {
        response.result.data.map((item: any) => {
          item.isActive = item.isActive ? "Yes" : "No";
          item.activeAtGrips = item.activeAtGrips ? "Yes" : "No";
          item.createdAt = convertDate(item.createdAt);
        });
        this.tableData = response.result;
      } else {
        this.toastService.showAlert(response.message, response.apiResponseStatus);
      }
    });
  }

  handleButtonClick($event: any) {
    this.VendorService.deleteStampVendor($event.rowData.stampVendorId).subscribe((response) => {
      response.apiResponseStatus == 1 ? this.getAllStampVendors() : this.toastService.showAlert(response.message, response.apiResponseStatus);
    });
  }

  showInsertDialog() {
    this.displayInsertModal = true;
  }

  onVendorTypeSelected($event: any) {
    this.vendorType = $event;
  }

  addVendors() {
    if (this.VendorDetailsEntryForm.valid) {
      this.vendorEntryPayload = {
        vendorType: this.vendorType,
        panNumber: this.VendorDetailsEntryForm.value.panNumber,
        licenseNo: this.VendorDetailsEntryForm.value.licenseNo,
        address: this.VendorDetailsEntryForm.value.address,
        phoneNumber: this.VendorDetailsEntryForm.value.phoneNumber,
        effectiveFrom: this.VendorDetailsEntryForm.value.effectiveFrom,
        validUpto: this.VendorDetailsEntryForm.value.validUpto
      };
      console.log(this.vendorEntryPayload);

      // this.VendorService.addNewStampVendor(this.vendorEntryPayload).subscribe((response) => {
      //   if (response.apiResponseStatus == 1) {
      //     this.toastService.showAlert('Vendor details added successfully', 1);
      //     this.displayInsertModal = false;
      //     this.getAllStampVendors();
      //   } else {
      //     this.toastService.showAlert(response.message, response.apiResponseStatus);
      //   }
      // });
    } else {
      this.toastService.showAlert('Please fill all the required fields', 0);
    }
  }
}
