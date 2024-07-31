import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PensionBill, ApiResponse } from '../../models/pension-bill';

@Injectable({
  providedIn: 'root'
})
export class PensionBillService {
  private apiUrl = 'v1/ppo/details'; // Update with your actual API URL

  constructor(private http: HttpClient) { }

  getRecords(payload: any): Observable<ApiResponse> {
    return this.http.patch<ApiResponse>(this.apiUrl, payload);
  }
}
