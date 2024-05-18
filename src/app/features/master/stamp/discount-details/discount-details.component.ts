import { Component, OnInit } from '@angular/core';
import { ActionButtonConfig, DynamicTable, DynamicTableQueryParameters } from 'src/app/core/models/dynamic-table';
import { tokenDetails } from 'src/app/core/models/token';
import { ToastService } from 'src/app/core/services/toast.service';
import { DiscountDetailsService } from 'src/app/core/services/stamp/discount-details.service';
import { convertDate } from 'src/utils/dateConversion';

@Component({
  selector: 'app-discount-details',
  templateUrl: './discount-details.component.html',
  styleUrls: ['./discount-details.component.scss'],
})
export class DiscountDetailsComponent implements OnInit {
  vendorType: any;
  tableActionButton: ActionButtonConfig[] = [];
  tableData!: DynamicTable<tokenDetails>;
  tableQueryParameters!: DynamicTableQueryParameters | any;
  displayModal: boolean | undefined;
  constructor(
    private DiscountDetailsService: DiscountDetailsService,
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
    this.getAllStampCategories();
  }
  getAllStampCategories() {
    this.DiscountDetailsService
      .getStampDiscountDetailsList(this.tableQueryParameters)
      .subscribe((response) => {
        if (response.apiResponseStatus == 1) {
          response.result.data.map((item: any) => {
            item.isActive = item.isActive ? "Yes" : "No"
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

  showDialog() {
    this.displayModal = true;
  }

  calculateDiscount() {
    console.log("clicked.")
  }
  onStampCategorySelected($event: any) {
    console.log("hi")
  }

  // onSelected() {

  // }

  handleButtonClick($event: any) {
    console.log($event);
  }

}
