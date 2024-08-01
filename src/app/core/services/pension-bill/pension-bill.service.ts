// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { PensionBill, ApiResponse } from '../../models/pension-bill';

// @Injectable({
//   providedIn: 'root'
// })
// export class PensionBillService {
//   private apiUrl = 'v1/ppo/details'; // Update with your actual API URL

//   constructor(private http: HttpClient) { }

//   getRecords(payload: any): Observable<ApiResponse> {
//     return this.http.patch<ApiResponse>(this.apiUrl, payload);
//   }
// }import { Injectable } from '@angular/core';


// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { ApiResponse } from 'src/app/core/models/pension-bill'; // Adjust the path as needed

// @Injectable({
//   providedIn: 'root'
// })
// export class PensionBillService {
//   constructor(private http: HttpClient) {}

//   getRecords(apiUrl: string, payload: any): Observable<ApiResponse> {
//     return this.http.patch<ApiResponse>(apiUrl, payload);
//   }
// }


// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { pensionbill_apiresponse } from 'src/app/core/models/pension-bill';

// @Injectable({
//   providedIn: 'root'
// })
// export class PensionBillService {
//   constructor(private http: HttpClient) {}

//   getRecords(apiUrl: string, payload: any): Observable<pensionbill_apiresponse> {
//     return this.http.patch<pensionbill_apiresponse>(apiUrl, payload);
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PensionBillApiResponse } from 'src/app/core/models/pension-bill';

@Injectable({
  providedIn: 'root'
})
export class PensionBillService {
  constructor(private http: HttpClient) {}

  getRecords(apiUrl: string, payload: any): Observable<PensionBillApiResponse> {
    return this.http.patch<PensionBillApiResponse>(apiUrl, payload);
  }
}
