import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ToastService } from '../toast.service';
import { DynamicTable, DynamicTableQueryParameters } from 'mh-prime-dynamic-table';
import { Observable, throwError } from 'rxjs';

import { log } from 'console';
import { map, catchError } from 'rxjs/operators';
import { IapiResponce } from '../../models/iapi-responce';
import { PensionCategoryDetails } from 'src/app/core/models/pension-category-details';


@Injectable({
  providedIn: 'root'
})
export class PensionCategoryDetailsService {

    apiUrl = "v1/pension/Pension-category";


    constructor(private http: HttpClient, private toastService: ToastService) {}

    get_all_Pension_details(
      queryParameters : DynamicTableQueryParameters
    ): Observable<IapiResponce> {
      return this.http
        .patch<IapiResponce>(
          'v1/pension/Pension-category',
          queryParameters
        )
        .pipe(
          catchError((error) => {
            throw this.toastService.showError(error.message);
          })
        );
    }

    //Get Pension Category By Id
    GetAllPensionDetailsByHoaId(id: string): Observable<IapiResponce<PensionCategoryDetails>> {
      return this.http.get<IapiResponce>('v1/pension/Pension-category/' + id).pipe(
        catchError((error) => {
          throw this.toastService.showError(error.message);
        })
      );

    }

    //Add New Pension Category
    add_new_Pension_details(dto: PensionCategoryDetails): Observable<IapiResponce> {
      return this.http.post<IapiResponce>('v1/pension/Pension-category', dto,
      ).pipe(
        catchError((error) => {
          this.toastService.showError(error.message);
          throw error;
        })
      );
    }

    //Update Pension Category
    updatePensionDetails(id: string, dto: PensionCategoryDetails): Observable<IapiResponce> {
      return this.http.put<IapiResponce>(`v1/pension/Pension-category/${id}`, dto).pipe(
        catchError((error) => {
          this.toastService.showError(error.message);
          return throwError(error);
        })
      );
    }

}
