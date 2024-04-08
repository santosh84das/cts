import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastService } from '../toast.service';
import { Observable, catchError } from 'rxjs';
import { IapiResponce } from '../../models/iapi-responce';
import { newIndent, ChequeIndentDeatil } from '../../models/cheque';


@Injectable({
  providedIn: 'root'
})
export class ChequeIndentService {

  constructor(private http: HttpClient, private toastService: ToastService) { }

  chqueIndentEntry(payload:newIndent):Observable <IapiResponce>{
    return this.http.post<IapiResponce>('v1/Cheque/cheque-indent',payload).pipe(
      catchError((error) => {
          throw this.toastService.showError(error.message);
      })
    );
  }
}
