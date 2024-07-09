import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastService } from '../toast.service';
import { DynamicTableQueryParameters } from 'mh-prime-dynamic-table';
import { IapiResponce } from '../../models/iapi-responce';
import { AddStampDiscountDetails, GetStampDiscountDetails } from '../../models/stamp';
import { Observable, catchError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class DiscountDetailsService {

  constructor(private http: HttpClient, private toastService: ToastService) { }
  getStampDiscountDetailsList(
    queryParameters: DynamicTableQueryParameters
  ): Observable<IapiResponce<GetStampDiscountDetails>> {
    return this.http
      .patch<IapiResponce<GetStampDiscountDetails>>(
        'v1/StampMaster/StampDiscountDetailsList',
        queryParameters
      )
      .pipe(
        catchError((error) => {
          throw this.toastService.showError(error.message);
        })
      );
  }


  addNewStampDiscountDetail(payload: AddStampDiscountDetails): Observable<IapiResponce> {
    return this.http.post<IapiResponce>('v1/StampMaster/CreateStampDiscountDetails', payload).pipe(
      catchError((error) => {
        throw this.toastService.showError(error.message);
      })
    );
  }

  deleteStampDiscountDetail(id: Number): Observable<IapiResponce> {
    return this.http.delete<IapiResponce>('v1/StampMaster/DeleteStampDiscountDetailsById?id='+ id).pipe(
      catchError((error) => {
        throw this.toastService.showError(error.message);
      })
    );
  }

  getDiscount(vendorTypeId: number, stampCategoryId: number, amount: number): Observable<IapiResponce> {
    return this.http.get<IapiResponce>(`v1/StampMaster/GetDiscount?vendorTypeId=${vendorTypeId}&stampCategoryId=${stampCategoryId}&amount=${amount}`).pipe(
      catchError((error) => {
        throw this.toastService.showError(error.message);
      })
    );
  }

}
