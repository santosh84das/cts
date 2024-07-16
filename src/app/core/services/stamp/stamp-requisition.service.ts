import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastService } from '../toast.service';
import { IapiResponce } from '../../models/iapi-responce';
import { Observable, catchError } from 'rxjs';
import { AddVendorStampRequisition, GetVendorStampRequisition } from '../../models/stamp';
import { DynamicTableQueryParameters } from '../../models/dynamic-table';

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

  getAllRequisitionsForwardedToTOForApproval(
    queryParameters: DynamicTableQueryParameters
  ): Observable<IapiResponce<GetVendorStampRequisition>> {
    return this.http
      .patch<IapiResponce<GetVendorStampRequisition>>(
        'v1/StampRequisition/GetAllStampRequisitionListWaitingForApprovalByTO',
        queryParameters
      )
      .pipe(
        catchError((error) => {
          throw this.toastService.showError(error.message);
        })
      );
  }

  getAllRequisitionsWaitingForPayment(
    queryParameters: DynamicTableQueryParameters
  ): Observable<IapiResponce<GetVendorStampRequisition>> {
    return this.http
      .patch<IapiResponce<GetVendorStampRequisition>>(
        'v1/StampRequisition/GetAllStampRequisitionWaitingForPayment',
        queryParameters
      )
      .pipe(
        catchError((error) => {
          throw this.toastService.showError(error.message);
        })
      );
  }

  getAllStampRequisitionWaitingForPaymentVerificatonByTO(
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

  getAllStampRequisitionWaitingForDelivery(
    queryParameters: DynamicTableQueryParameters
  ): Observable<IapiResponce<GetVendorStampRequisition>> {
    return this.http
      .patch<IapiResponce<GetVendorStampRequisition>>(
        'v1/StampRequisition/GetAllStampRequisitionListForDelivery',
        queryParameters
      )
      .pipe(
        catchError((error) => {
          console.log(error);
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
  printtr7(id: number): Observable<IapiResponce<any>> {
    return this.http.get<IapiResponce<any>>(`v1/StampRequisition/TrFromGenerationDataByRequisitionId?stampRequisitionId=${id}`).pipe((catchError((error) => {
      throw this.toastService.showError(error.message)
    })))
  }
}
