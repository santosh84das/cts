import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastService } from '../toast.service';
import { IapiResponce } from '../../models/iapi-responce';
import { Observable, catchError } from 'rxjs';
import { AddVendorStampRequisition, GetVendorStampRequisition } from '../../models/stamp';
import { DynamicTableQueryParameters } from 'mh-prime-dynamic-table/lib/mh-prime-dynamic-table-interface';

@Injectable({
  providedIn: 'root'
})
export class StampRequisitionService {

  constructor(private http: HttpClient, private toastService: ToastService) { }

  getAllStampRequisitions(
    queryParameters: DynamicTableQueryParameters
  ): Observable<IapiResponce<GetVendorStampRequisition>> {
    return this.http
      .patch<IapiResponce<GetVendorStampRequisition>>(
        'v1/StampRequisition/GetAllStampRequisitionList',
        queryParameters
      )
      .pipe(
        catchError((error) => {
          throw this.toastService.showError(error.message);
        })
      );
  }

  addNewStampRequisition(payload: AddVendorStampRequisition): Observable<IapiResponce> {
    return this.http.post<IapiResponce>('v1/StampRequisition/CreateStampRequisition', payload).pipe(
      catchError((error) => {
        throw this.toastService.showError(error.message);
      })
    );
  }
}
