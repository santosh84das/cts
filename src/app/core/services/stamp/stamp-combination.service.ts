import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DynamicTableQueryParameters } from 'mh-prime-dynamic-table';
import { Observable, catchError } from 'rxjs';
import { IapiResponce } from '../../models/iapi-responce';
import { AddStampCombination, GetStampCombinations } from '../../models/stamp';
import { ToastService } from '../toast.service';

@Injectable({
  providedIn: 'root'
})
export class StampCombinationService {

  constructor(private http: HttpClient, private toastService: ToastService) { }

  getStampCombinationList(
    queryParameters: DynamicTableQueryParameters
  ): Observable<IapiResponce<GetStampCombinations>> {
    return this.http
      .patch<IapiResponce<GetStampCombinations>>(
        'v1/StampMaster/StampCombinationList',
        queryParameters
      )
      .pipe(
        catchError((error) => {
          throw this.toastService.showError(error.message);
        })
      );
  }

  getAllStampCombinations(): Observable<IapiResponce<GetStampCombinations>> {
    return this.http
      .get<IapiResponce<GetStampCombinations>>(
        'v1/StampMaster/GetALLStampCombinations')
      .pipe(
        catchError((error) => {
          throw this.toastService.showError(error.message);
        })
      );
  }

  deleteStampCombination(id: Number): Observable<IapiResponce> {
    return this.http.delete<IapiResponce>('v1/StampMaster/DeleteStampCombinationById?id='+id).pipe(
      catchError((error) => {
        throw this.toastService.showError(error.message);
      })
    );
  }

  // TODO: Write the AddStampCombination Interface.
  addNewStampCombination(payload: AddStampCombination): Observable<IapiResponce> {
    return this.http.post<IapiResponce>('v1/StampMaster/CreateStampCombination', payload).pipe(
      catchError((error) => {
        throw this.toastService.showError(error.message);
      })
    );
  }
}
