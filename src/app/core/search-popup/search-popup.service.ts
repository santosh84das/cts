
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PensionBillApiResponse } from 'src/app/core/models/pension-bill';
import { IapiResponce } from '../models/iapi-responce';

@Injectable({
  providedIn: 'root'
})
export class SearchPopupService{
  constructor(private http: HttpClient) {}

  getRecords(apiUrl: string, payload: any): Observable<IapiResponce> {
    return this.http.patch<IapiResponce>(apiUrl, payload);
  }
}
