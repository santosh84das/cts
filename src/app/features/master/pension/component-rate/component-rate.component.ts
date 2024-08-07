import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

import { SearchPopupComponent, SearchPopupConfig } from 'src/app/core/search-popup/search-popup.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Payload } from 'src/app/core/models/search-query';
import { reduce } from 'rxjs';
import { reverse } from 'dns';

@Component({
  selector: 'app-component-rate',
  templateUrl: './component-rate.component.html',
  styleUrls: ['./component-rate.component.scss']
})
export class ComponentRateComponent implements OnInit {
  // added
  tabledata: any;
  isTableDataLoading = false;

  ref: DynamicDialogRef | undefined;
  ComponentRateForm = new FormGroup({
    rate:  new FormControl('',Validators.required),
    pensionCategoryId: new FormControl('',Validators.required),
    description: new FormControl('', Validators.required),
  });

  constructor(private dialogService: DialogService) { }

  ngOnInit(): void {
    console.log('ngOnInit');
  }

  onRefresh(){
    console.log(this.ComponentRateForm.value);
  }

  searchOne(): void {
    console.log("Search One");
    let payload:Payload={
      "pageSize":10,
      "pageIndex":0,
      "filterParameters":[],
      "sortParameters":{
        "field":"",
        "order":""
      }
    };
    const config : SearchPopupConfig={
      payload: payload,
      apiUrl:'v1/pension/category',
    };
    this.ref = this.dialogService.open(SearchPopupComponent, {
      data: config,
      header: 'Search record',
      width: '60%'
    });
    this.ref.onClose.subscribe((record: any) => {
    if (record) {
      console.log(record);
      this.ComponentRateForm.controls['pensionCategoryId'].setValue(record.primaryCategoryId);
      this.ComponentRateForm.controls['description'].setValue(record.categoryName);

      
    }
    });
  }

  searchTwo(){
    console.log("Search Two");
  }


  // adding dynamic table
  handleRowSelection(event: any): void {
    console.log('Selected rows:', event);
  }

  handleButtonClick(event: any): void {
    console.log('Action button clicked:', event);
  }

  handQueryParameterChange(event: any): void {
    console.log('Query parameters changed:', event);
  }

  handsearchKeyChange(event: any): void {
    console.log('Search key changed:', event);
  }


}