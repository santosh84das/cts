import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastService } from '../toast.service';
import { DynamicTable, DynamicTableQueryParameters } from 'mh-prime-dynamic-table';
import { IapiResponce } from '../../models/iapi-responce';
import { Observable, throwError } from 'rxjs';
import { manualPpoReceiptEntryDTO } from '../../models/manual-ppo-receipt';
import { log } from 'console';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root' 
})



export class ManualPpoReceiptService {

  apiUrl = "v1/manual-ppo/receipts";


  constructor(private http: HttpClient, private toastService: ToastService) {}
  
  getAllManualPpoReceipt(
    queryParameters: DynamicTableQueryParameters
  ): Observable<IapiResponce<manualPpoReceiptEntryDTO>> {
    return this.http
      .patch<IapiResponce<manualPpoReceiptEntryDTO>>(
        'v1/manual-ppo/receipts',
        queryParameters
      )
      .pipe(
        catchError((error) => {
          throw this.toastService.showError(error.message);
        })
      );
  }

  //Get Manual PPO Receipt By Id
  getManualPpoDetailsById(id: string): Observable<IapiResponce<manualPpoReceiptEntryDTO>> {
    return this.http.get<IapiResponce>('v1/manual-ppo/receipts/' + id).pipe(
      catchError((error) => {
        throw this.toastService.showError(error.message);
      })
    );
    
  }

  //Add New Manual PPO Receipt
  addNewManualPpoReceipt(dto: manualPpoReceiptEntryDTO): Observable<IapiResponce> {
    return this.http.post<IapiResponce>('v1/manual-ppo/receipts', dto).pipe(
      catchError((error) => {
        this.toastService.showError(error.message);
        throw error;
      }) 
    );
  }

  //Update Manual PPO Receipt
  updateManualPpoReceipt(id: string, dto: manualPpoReceiptEntryDTO): Observable<IapiResponce> {
    return this.http.put<IapiResponce>(`v1/manual-ppo/receipts/${id}`, dto).pipe(
      catchError((error) => {
        this.toastService.showError(error.message);
        return throwError(error);
      })
    );
  }


}
