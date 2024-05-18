import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastService } from '../toast.service';
import { DynamicTableQueryParameters } from 'mh-prime-dynamic-table';
import { IapiResponce } from '../../models/iapi-responce';
import { AddStampLabel, GetStampLabels } from '../../models/stamp';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LabelService {

  constructor(private http: HttpClient, private toastService: ToastService) { }


  getStampLabelList(
    queryParameters: DynamicTableQueryParameters
  ): Observable<IapiResponce<GetStampLabels>> {
    return this.http
      .patch<IapiResponce<GetStampLabels>>(
        'v1/StampMaster/StampLabelList',
        queryParameters
      )
      .pipe(
        catchError((error) => {
          throw this.toastService.showError(error.message);
        })
      );
  }

  addNewStampLabel(paylod: AddStampLabel): Observable<IapiResponce> {
    return this.http.post<IapiResponce>('v1/StampMaster/CreateStampLabel', paylod).pipe(
      catchError((error) => {
        throw this.toastService.showError(error.message);
      })
    );
  }
}
