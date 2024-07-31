import { Component, OnInit } from '@angular/core';
import { PensionBillService } from 'src/app/core/services/pension-bill/pension-bill.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { PensionBill, Header, ApiResponse } from 'src/app/core/models/pension-bill';

@Component({
  selector: 'app-search-popup',
  templateUrl: './search-popup.component.html',
  // styleUrls: ['./search-popup.component.css']
})
export class SearchPopupComponent implements OnInit {
  records: PensionBill[] = [];
  cols: any[] = [];
  filteredRecords: PensionBill[] = [];
  searchTerm: string = '';

  constructor(
    private recordService: PensionBillService,
    public ref: DynamicDialogRef
  ) {}

  ngOnInit(): void {
    const payload = {
      listType: "string",
      pageSize: 10,
      pageIndex: 0,
      filterParameters: [],
      sortParameters: {
        field: "ppoNo",
        order: "asc"
      }
    };

    this.recordService.getRecords(payload).subscribe((response: ApiResponse) => {
      const { headers, data } = response.result;
      this.records = data;
      this.filteredRecords = data;
      this.cols = headers.map((header: Header) => ({
        field: header.fieldName,
        header: header.name
      }));
    });
  }

  selectRecord(record: PensionBill): void {
    this.ref.close(record);
  }

  filterRecords(): void {
    if (this.searchTerm) {
      this.filteredRecords = this.records.filter(record =>
        record.pensionerName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredRecords = [...this.records];
    }
  }
}
