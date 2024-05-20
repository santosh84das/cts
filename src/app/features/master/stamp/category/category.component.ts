import { Component, OnInit } from '@angular/core';
import { ActionButtonConfig, DynamicTable, DynamicTableQueryParameters } from 'src/app/core/models/dynamic-table';
import { tokenDetails } from 'src/app/core/models/token';
import { ToastService } from 'src/app/core/services/toast.service';
import { CategoryService } from 'src/app/core/services/stamp/category.service';
import { convertDate } from 'src/utils/dateConversion';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categoryEntryForm!: FormGroup;
  displayInsertModal: boolean | undefined;
  tableActionButton: ActionButtonConfig[] = [];
  tableData!: DynamicTable<tokenDetails>;
  tableQueryParameters!: DynamicTableQueryParameters | any;

  constructor(
    private categoryService: CategoryService,
    private toastService: ToastService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
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

    this.initializeForm();
    this.getAllStampCategories();
  }

  initializeForm(): void {
    this.categoryEntryForm = this.fb.group({
      // Define form controls and their initial values
      categoryName: new FormControl(''),
      // Add more form controls as needed
    });
  }

  getAllStampCategories() {
    this.categoryService
      .getStampLabelCategories(this.tableQueryParameters)
      .subscribe((response) => {
        if (response.apiResponseStatus == 1) {
          response.result.data.map((item: any) => {
            item.isActive = item.isActive ? "Yes" : "No";
            item.createdAt = convertDate(item.createdAt);
          });
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
    this.categoryService.deleteStampCategory($event.rowData.stampCategoryId)
      .subscribe((response) => {
        response.apiResponseStatus == 1 ? this.getAllStampCategories() : this.toastService.showAlert(
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
