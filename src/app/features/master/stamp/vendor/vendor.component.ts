import { Component, OnInit } from '@angular/core';
import { ActionButtonConfig, DynamicTable, DynamicTableQueryParameters } from 'src/app/core/models/dynamic-table';
import { tokenDetails } from 'src/app/core/models/token';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/core/services/toast.service';
import { VendorService } from 'src/app/core/services/stamp/vendor.service';
import { convertDate } from 'src/utils/dateConversion';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss']
})
export class VendorComponent implements OnInit {

  VendorDetailsEntryForm! : FormGroup
  displayInsertModal : boolean | undefined
  tableActionButton: ActionButtonConfig[] = [];
  tableData!: DynamicTable<tokenDetails>;
  tableQueryParameters!: DynamicTableQueryParameters | any;
  constructor(
    private VendorService: VendorService,
    private toastService: ToastService,
  ) { }

  ngOnInit(): void {
    this.tableActionButton = [
      // {
      //   buttonIdentifier: 'edit',
      //   class: 'p-button-warning p-button-sm',
      //   icon: 'pi pi-file-edit',
      //   lable: 'Edit',
      // },
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
  getAllStampVendors() {
    this.VendorService
      .getStampVendorList(this.tableQueryParameters)
      .subscribe((response) => {
        if (response.apiResponseStatus == 1) {
            response.result.data.map((item:any) => {
            item.isActive = item.isActive ? "Yes" : "No"
            item.activeAtGrips = item.activeAtGrips ? "Yes" : "No"
            item.createdAt = convertDate(item.createdAt)
          })
          this.tableData = response.result;
        } else {
          this.toastService.showAlert(
            response.message,
            response.apiResponseStatus
          );
        }
      });
  }

  handleButtonClick($event: any) {
    this.VendorService.deleteStampVendor($event.rowData.stampVendorId)
      .subscribe((response) => {
        response.apiResponseStatus == 1 ? this.getAllStampVendors() : this.toastService.showAlert(
          response.message,
          response.apiResponseStatus
        );

      });
  }

  showInsertDialog() {
    this.displayInsertModal = true;
  }

  onStampCategorySelected() {

  }
  
}
