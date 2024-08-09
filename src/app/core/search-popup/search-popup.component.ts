import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { SearchPopupService } from './search-popup.service';
import { ToastService } from '../services/toast.service';
export interface SearchPopupConfig {
  payload: any;
  apiUrl: string; // API URL parameter
  responseInterface?: new () => any; // Optional if not needed
}



@Component({
  selector: 'app-search-popup',
  templateUrl: './search-popup.component.html',
})
export class SearchPopupComponent implements OnInit {
  records: any[] = [];
  cols: any[] = [];
  filteredRecords: any[] = [];
  searchTerm: string = '';
  noresult: string = '';
  

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private search: SearchPopupService,
    private tostservice: ToastService
  ) { }

  ngOnInit(): void {
    this.popUpfunction();
  }

  popUpfunction(): void {
    const { payload, apiUrl } = this.config.data as SearchPopupConfig;
    const storeHeaders = localStorage.getItem('tableHeader');
    const storeData = localStorage.getItem('tableData');

    if (storeData && storeHeaders) {

      this.cols = JSON.parse(storeHeaders);
      this.records = JSON.parse(storeData);
      this.filteredRecords = this.records;

    } else {
      this.search.getRecords(apiUrl, payload).subscribe(
        (response) => {
          if (response && response.result) {
            const { headers, data } = response.result;
            this.cols = headers.map((header: any) => ({
              field: header.fieldName,
              header: header.name

            }));

            localStorage.setItem('tableHeader', JSON.stringify(this.cols));
            localStorage.setItem('tableData', JSON.stringify(data));

            this.records = data;
            this.filteredRecords = data;

          } else {
            console.error('Invalid API response structure', response);
          }
        },
        (error: any) => {
          this.tostservice.showError('Error fetching records');
          // console.error('Error fetching records', error);
        }
      );
    }
  }

  selectRecord(record: any): void {
    this.ref.close(record);
  }

  filterRecords(): void {
    if (this.searchTerm) {
      const lowerCaseSearchTerm = this.searchTerm.toLowerCase(); 
      // Filter records based on any property value that contains the search term, case-insensitive.
      this.filteredRecords = this.records.filter(record =>
        Object.values(record).some(value => {
          if (typeof value === 'string' || typeof value === 'number') {
            return value.toString().toLowerCase().includes(lowerCaseSearchTerm);
          }
          return false;
        })
      );
      if (this.filteredRecords.length === 0) {
        this.noresult = 'No records found';
      } else {
        this.noresult = '';
      }
    } else {
      this.filteredRecords = [...this.records];
      this.noresult = '';
    }

  }


}
