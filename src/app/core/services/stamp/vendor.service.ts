import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastService } from '../toast.service';
import { DynamicTableQueryParameters } from 'mh-prime-dynamic-table';
import { IapiResponce } from '../../models/iapi-responce';
import { GetStampVendors, AddStampVendors } from '../../models/stamp';
import { Observable, catchError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class VendorService {

  constructor(private http: HttpClient, private toastService: ToastService) { }

  getStampVendorList(
    queryParameters: DynamicTableQueryParameters
  ): Observable<IapiResponce<GetStampVendors>> {
    return this.http
      .patch<IapiResponce<GetStampVendors>>(
        'v1/StampMaster/StampVendorList',
        queryParameters
      )
      .pipe(
        catchError((error) => {
          throw this.toastService.showError(error.message);
        })
      );
  }

  addNewStampVendor(paylod: AddStampVendors): Observable<IapiResponce> {
    return this.http.post<IapiResponce>('v1/StampMaster/CreateStampVendor', paylod).pipe(
      catchError((error) => {
        throw this.toastService.showError(error.message);
      })
    );
  }
}
