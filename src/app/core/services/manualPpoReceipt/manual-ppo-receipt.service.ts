import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastService } from '../toast.service';
import { DynamicTableQueryParameters } from 'mh-prime-dynamic-table';
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

  //Get All Manual PPO Receipt
  // getAllManualPpoReceipt(queryParameters: DynamicTableQueryParameters): Observable<IapiResponce<ManualPpoReceiptDTO[]>> {
  //   const illuminateNils = JSON.parse(JSON.stringify(queryParameters));
  //   const params = new HttpParams({ fromObject: illuminateNils });
  //   return this.http
  //     .get<IapiResponce<ManualPpoReceiptDTO[]>>('v1/manual-ppo/receipts', { params })
  //     .pipe(
  //       catchError((error) => {
  //         throw this.toastService.showError(error.message);
  //       })
  //     );   
  // } 

  // getAllStampIndents(
  //   queryParameters: DynamicTableQueryParameters
  // ): Observable<IapiResponce<ManualPpoReceiptDTO>> {
  //   return this.http
  //     .get<IapiResponce<ManualPpoReceiptDTO>>(
  //       'v1/manual-ppo/receipts',
  //       queryParameters
  //     )
  //     .pipe(
  //       catchError((error) => {
  //         throw this.toastService.showError(error.message);
  //       })
  //     );
  // }

  getAllManualPpoReceipt(
    queryParameters: DynamicTableQueryParameters
  ): Observable<IapiResponce<manualPpoReceiptEntryDTO>> {
    let params = new HttpParams();
    // for (const key in queryParameters) {
    //   if (queryParameters.hasOwnProperty(key)) {
    //     params = params.set(key, queryParameters[key]);

    //   }
    // }

    return this.http
      .get<IapiResponce<manualPpoReceiptEntryDTO>>(this.apiUrl, { params })
      .pipe(
        catchError((error) => {
          this.toastService.showError(error.message);
          return throwError(error);
        })
      );
  }

  //Get Manual PPO Receipt By Id
  getManualPpoDetailsById(id: string): Observable<IapiResponce<manualPpoReceiptEntryDTO>> {
    console.log("Hi service");
    return this.http.get<IapiResponce>('v1/manual-ppo/receipts?id=' + id).pipe(
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
    return this.http.patch<IapiResponce>('v1/manual-ppo/receipts/' + id, dto).pipe(
      catchError((error) => {
        this.toastService.showError(error.message);
        throw error;
      })
    );
  }


}
