import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastService } from '../toast.service';
import { Observable, catchError } from 'rxjs';
import { IapiResponce } from '../../models/iapi-responce';
import { newIndent, ChequeIndentDeatil, ChequeIndentList } from '../../models/cheque';
import { DynamicTable, DynamicTableQueryParameters } from '../../models/dynamic-table';


@Injectable({
  providedIn: 'root'
})
export class ChequeIndentService {

  constructor(private http: HttpClient, private toastService: ToastService) { }

  chqueIndentEntry(payload: newIndent): Observable<IapiResponce> {
    return this.http.post<IapiResponce>('v1/Cheque/cheque-indent', payload).pipe(
      catchError((error) => {
        throw this.toastService.showError(error.message);
      })
    );
  }
  getChqueIndentList(queryParameters: DynamicTableQueryParameters): Observable<IapiResponce<DynamicTable<ChequeIndentList>>> {
    return this.http
      .patch<IapiResponce<DynamicTable<ChequeIndentList>>>(
        'v1/Cheque/cheque-indent-list',
        queryParameters
      )
      .pipe(
        catchError((error) => {
          throw this.toastService.showError(error.message);
        })
      );
  }
  approveChequeIndent(indentId: number): Observable<IapiResponce> {
    return this.http
      .put<IapiResponce>('v1/Cheque/cheque-indent-approve', {indentId})
      .pipe(
        catchError((error) => {
          throw this.toastService.showError(error.message);
        })
      );
  }
  rejectChequeIndent(indentId: number): Observable<IapiResponce> {
    return this.http
      .put<IapiResponce>('v1/Cheque/cheque-indent-reject', {indentId})
      .pipe(
        catchError((error) => {
          throw this.toastService.showError(error.message);
        })
      );
  }
}
