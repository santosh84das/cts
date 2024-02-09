import { Injectable } from '@angular/core';
import { ToastService } from '../toast.service';
import { Observable, catchError } from 'rxjs';
import { IapiResponce } from '../../models/iapi-responce';
import { HttpClient } from '@angular/common/http';
import { error } from 'console';
import { HoaChain, IBillCheck, IBillDetails, IBills } from '../../models/bill';
import { IObjection } from '../../models/objection';

@Injectable({
    providedIn: 'root',
})
export class BillService {
    billDetails: IBillDetails | any;
    constructor(private http: HttpClient, private toastService: ToastService) {}
    getAllBills(): Observable<IapiResponce<IBills>> {
        return this.http.get<IapiResponce<IBills>>('v1/Bill/GetBills').pipe(
            catchError((error) => {
                throw this.toastService.showError(error.message);
            })
        );
    }

    getBillDetails(token_id: number): Observable<IapiResponce<IBillDetails>> {
        return this.http
            .get<IapiResponce<IBillDetails>>(
                'v1/BillChecking/GetBillDetails/' + token_id
            )
            .pipe(
                catchError((error) => {
                    throw this.toastService.showError(error.message);
                })
            );
    }
    generateHOAChain(hoaChain: HoaChain | undefined) {
        // return hoaChain?.demand+' - '+hoaChain?.majorHead+'-'+hoaChain?.subMajorHead+'-'+hoaChain?.minorHead+' - '+hoaChain?.schemeHead+' - '+hoaChain?.votedCharged+' - '+hoaChain?.detailHead+' - '+hoaChain?.subDetailHead;
        return (
            hoaChain?.demand +
            ' - ' +
            hoaChain?.majorHead +
            '-' +
            hoaChain?.subMajorHead +
            '-' +
            hoaChain?.minorHead +
            ' - ' +
            hoaChain?.schemeHead +
            ' - ' +
            hoaChain?.votedCharged +
            ' - ' +
            hoaChain?.detailHead
        );
    }
    billCheck(billCheckData: IBillCheck): Observable<IapiResponce> {
        return this.http
            .post<IapiResponce>('v1/BillChecking/BillCheck', billCheckData)
            .pipe(
                catchError((error) => {
                    throw this.toastService.showError(error.message);
                })
            );
    }

    saveReturnMemo(billCheck:IBillCheck) {
        return this.http.post<IapiResponce>('v1/ReturnMemo/Generate',billCheck).pipe(
            catchError((error) => {
                throw this.toastService.showError(error.message);
            })
        )
    }

}
