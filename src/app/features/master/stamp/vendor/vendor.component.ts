import { Component, OnInit } from '@angular/core';
import { ActionButtonConfig, DynamicTable, DynamicTableQueryParameters } from 'src/app/core/models/dynamic-table';
import { tokenDetails } from 'src/app/core/models/token';
import { ToastService } from 'src/app/core/services/toast.service';
import { VendorService } from 'src/app/core/services/stamp/vendor.service';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss']
})
export class VendorComponent implements OnInit {

  tableActionButton: ActionButtonConfig[] = [];
  tableData!: DynamicTable<tokenDetails>;
  tableQueryParameters!: DynamicTableQueryParameters | any;
  constructor(
    private VendorService: VendorService,
    private toastService: ToastService,
  ) { }

  ngOnInit(): void {
    this.tableActionButton = [
      {
        buttonIdentifier: 'edit',
        class: 'p-button-warning p-button-sm',
        icon: 'pi pi-file-edit',
        lable: 'Edit',
      },
      {
        buttonIdentifier: 'delete',
        class: 'p-button-danger p-button-sm',
        icon: 'pi pi-file-delete',
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
          this.tableData = response.result;
        } else {
          this.toastService.showAlert(
            response.message,
            response.apiResponseStatus
          );
        }
      });
  }


}
