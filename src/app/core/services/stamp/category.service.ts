import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastService } from '../toast.service';
import { DynamicTableQueryParameters } from 'mh-prime-dynamic-table';
import { IapiResponce } from '../../models/iapi-responce';
import { Observable, catchError } from 'rxjs';
import { GetStampCategories, AddStampCategory } from '../../models/stamp';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient, private toastService: ToastService) { }

  getStampLabelCategoris(
    queryParameters: DynamicTableQueryParameters
  ): Observable<IapiResponce<GetStampCategories>> {
    return this.http
      .patch<IapiResponce<GetStampCategories>>(
        'v1/StampMaster/StampCategoryList',
        queryParameters
      )
      .pipe(
        catchError((error) => {
          throw this.toastService.showError(error.message);
        })
      );
  }

  addNewStampCategory(paylod: AddStampCategory): Observable<IapiResponce> {
    return this.http.post<IapiResponce>('v1/StampMaster/CreateStampCategory', paylod).pipe(
      catchError((error) => {
        throw this.toastService.showError(error.message);
      })
    );
  }
}
