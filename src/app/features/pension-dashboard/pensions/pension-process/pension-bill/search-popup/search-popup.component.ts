// // src/app/search-popup/search-popup.component.ts
// import { Component, OnInit } from '@angular/core';
// import { RecordService } from '../record.service';
// import { DynamicDialogRef } from 'primeng/dynamicdialog';
// import { Observable } from 'rxjs';
// import {Injectable} from '@angular/core';

// @Injectable({
//     providedIn: 'root'
// })
// @Component({
//   selector: 'app-search-popup',
//   templateUrl: './search-popup.component.html',
//   // styleUrls: ['./search-popup.component.css']
// })
// export class SearchPopupComponent implements OnInit {
//   records: any[] = [];

//   constructor(
//     private recordService: RecordService,
//     public ref: DynamicDialogRef
//   ) { }
//   ngOnInit(): void {
//     this.recordService.getRecords().subscribe(data => {
//       this.records = data;
//     });
//   }
//   selectRecord(record: any) {
//     this.ref.close(record);
//   }
// }


import { Component, OnInit } from '@angular/core';
import { RecordService } from '../record.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-search-popup',
  templateUrl: './search-popup.component.html'
})
export class SearchPopupComponent implements OnInit {
  records: any[] = [];

  constructor(
    private recordService: RecordService,
    public ref: DynamicDialogRef
  ) { }

  ngOnInit(): void {
    this.recordService.getRecords().subscribe(data => {
      this.records = data;
    });
  }


  selectRecord(record: any) {
    this.ref.close(record);
  }
}