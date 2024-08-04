import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ToastService } from '../toast.service';
import {
    DynamicTable,
    DynamicTableQueryParameters,
} from 'mh-prime-dynamic-table';
import { Observable, throwError } from 'rxjs';

import { log } from 'console';
import { map, catchError } from 'rxjs/operators';
import { manualPpoReceiptEntryDTO } from '../../models/manual-ppo-receipt';
import { IapiResponce } from '../../models/iapi-responce';
import { SubCategoryDetalis } from 'src/app/core/models/sub-category-detalis';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryDetailsService {
    apiUrl = 'v1/pension/Sub-category';

    constructor(private http: HttpClient, private toastService: ToastService) {}

    get_all_Sub_details(
        queryParameters: DynamicTableQueryParameters
    ): Observable<IapiResponce> {
        return this.http
            .patch<IapiResponce>('v1/pension/Sub-category', queryParameters)
            .pipe(
                catchError((error) => {
                    throw this.toastService.showError(error.message);
                })
            );
    }

    //Get Sub Category By Id
    GetAllSubDetailsByHoaId(
        id: string
    ): Observable<IapiResponce<SubCategoryDetalis>> {
        return this.http
            .get<IapiResponce>('v1/pension/Sub-category/' + id)
            .pipe(
                catchError((error) => {
                    throw this.toastService.showError(error.message);
                })
            );
    }

    //Add New Sub Category
    add_new_Sub_details(
        dto: SubCategoryDetalis
    ): Observable<IapiResponce> {
        return this.http
            .post<IapiResponce>('v1/pension/Sub-category', dto)
            .pipe(
                catchError((error) => {
                    this.toastService.showError(error.message);
                    throw error;
                })
            );
    }

    //Update Sub Category
    updateSubCategoryDetails(
        id: string,
        dto: SubCategoryDetalis
    ): Observable<IapiResponce> {
        return this.http
            .put<IapiResponce>(`v1/pension/Sub-category/${id}`, dto)
            .pipe(
                catchError((error) => {
                    this.toastService.showError(error.message);
                    return throwError(error);
                })
            );
    }
}
