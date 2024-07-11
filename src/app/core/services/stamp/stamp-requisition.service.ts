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

  newRequisitions(
    queryParameters: DynamicTableQueryParameters
  ): Observable<IapiResponce<GetVendorStampRequisition>> {
    return this.http
      .patch<IapiResponce<GetVendorStampRequisition>>(
        'v1/StampRequisition/GetAllStampRequisitionListForClerk',
        queryParameters
      )
      .pipe(
        catchError((error) => {
          throw this.toastService.showError(error.message);
        })
      );
  }

  getAllRequisitionsForwardedToTO(
    queryParameters: DynamicTableQueryParameters
  ): Observable<IapiResponce<GetVendorStampRequisition>> {
    return this.http
      .patch<IapiResponce<GetVendorStampRequisition>>(
        'v1/StampRequisition/GetAllStampRequisitionListForTO',
        queryParameters
      )
      .pipe(
        catchError((error) => {
          throw this.toastService.showError(error.message);
        })
      );
  }

  getAllWaitingForTOVerification(
    queryParameters: DynamicTableQueryParameters
  ): Observable<IapiResponce<GetVendorStampRequisition>> {
    return this.http
      .patch<IapiResponce<GetVendorStampRequisition>>(
        'v1/StampRequisition/GetAllStampRequisitionWaitingForPaymentVerificatonByTO',
        queryParameters
      )
      .pipe(
        catchError((error) => {
          throw this.toastService.showError(error.message);
        })
      );
  }

  registerGRNNo(queryParameters: any): Observable<IapiResponce<boolean>> {
    return this.http.get<IapiResponce<boolean>>(`v1/StampRequisition/PaymentProcessByDEO?vendorStampRequisitionId=${queryParameters.vendorStampRequisitionId}&grnNo=${queryParameters.GRNNo}`).pipe(catchError((error) => {
      throw this.toastService.showError(error.message)
    }))
  }

  rejectedByTO(id: number): Observable<IapiResponce<boolean>> {
    return this.http.get<IapiResponce<boolean>>(`v1/StampRequisition/StampRequisitionRejectedByTreasuryOfficer?stampRequisitionId=${id}`).pipe((catchError((error) => {
      throw this.toastService.showError(error.message)
    })))
  }

  rejectedByStampClerk(id: number): Observable<IapiResponce<boolean>> {
    return this.http.get<IapiResponce<boolean>>(`v1/StampRequisition/StampRequisitionRejectedByStampClerk?stampRequisitionId=${id}`).pipe((catchError((error) => {
      throw this.toastService.showError(error.message)
    })))
  }
}
