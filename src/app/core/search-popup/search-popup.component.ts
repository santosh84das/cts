import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Header, PensionBillApiResponse } from 'src/app/core/models/pension-bill';
import { Observable } from 'rxjs';
import { SearchPopupService } from './search-popup.service';

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

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private search: SearchPopupService
  ) {}

  ngOnInit(): void {
    this.popUpfunction();
  }

  popUpfunction(): void {
    const { payload, apiUrl } = this.config.data as SearchPopupConfig;

    console.log('Payload:', payload);
    console.log('API URL:', apiUrl);

    this.search.getRecords(apiUrl, payload).subscribe(
      (response) => {
        console.log('API Response:', response);
        if (response && response.result) {
          
          const { headers, data } = response.result;
          this.records = data;
          this.filteredRecords = data;
          this.cols = headers.map((header: Header) => ({
            field: header.fieldName,
            header: header.name
          }));
        } else {
          console.error('Invalid API response structure', response);
        }
      },
      (error: any) => {
        console.error('Error fetching records', error);
      }
    );
  }

  selectRecord(record: any): void {
    this.ref.close(record);
  }

  filterRecords(): void {
    if (this.searchTerm) {
      this.filteredRecords = this.records.filter(record =>
        record.pensionerName?.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredRecords = [...this.records];
    }
  }
}
