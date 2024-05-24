import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastService } from '../toast.service';
import { DynamicTableQueryParameters } from 'mh-prime-dynamic-table';
import { IapiResponce } from '../../models/iapi-responce';
import { Observable, catchError } from 'rxjs';
import { AddStampIndent, GetStampCategories } from '../../models/stamp';
@Injectable({
  providedIn: 'root'
})
export class StampIndentService {

  constructor(private http: HttpClient, private toastService: ToastService) { }

  getAllStampIndents(
    queryParameters: DynamicTableQueryParameters
  ): Observable<IapiResponce<GetStampCategories>> {
    return this.http
      .patch<IapiResponce<GetStampCategories>>(
        'v1/Stamp/StampIndentList',
        queryParameters
      )
      .pipe(
        catchError((error) => {
          throw this.toastService.showError(error.message);
        })
      );
  }

  addNewStampIndent(payload: AddStampIndent): Observable<IapiResponce> {
    return this.http.post<IapiResponce>('v1/Stamp/CreateStampIndent', payload).pipe(
      catchError((error) => {
        throw this.toastService.showError(error.message);
      })
    );
  }
  deleteStampIndent(id: Number): Observable<IapiResponce> {
    return this.http.delete<IapiResponce>('v1/Stamp/DeleteStampIndentById?id=' + id).pipe(
      catchError((error) => {
        throw this.toastService.showError(error.message);
      })
    );
  }
}
