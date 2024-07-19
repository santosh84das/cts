import { Injectable } from '@angular/core';
import { ToastService } from '../toast.service';
import { Observable, catchError } from 'rxjs';
import { IapiResponce } from '../../models/iapi-responce';
import { HttpClient } from '@angular/common/http';
import { error } from 'console';
import { AllotmentDetails, BillInfo, ByTransferDetails, ECS_NEFT, HoaChain, IBillCheck, IBillDetails, IBills, IChequeDetails, IRetunMemoBillDetils, IReturnMemoCount } from '../../models/bill';
import { IObjection } from '../../models/objection';

@Injectable({
    providedIn: 'root',
})
export class BillService {
    billDetails: IBillDetails | any;
    constructor(private http: HttpClient, private toastService: ToastService) { }
    getAllBills(): Observable<IapiResponce<IBills>> {
        return this.http.get<IapiResponce<IBills>>('v1/Bill/GetBills').pipe(
            catchError((error) => {
                throw this.toastService.showError(error.message);
            })
        );
    }
    getBillInfo(to0kenId: number): Observable<IapiResponce<BillInfo>> {
        return this.http
            .get<IapiResponce<BillInfo>>('v1/BillChecking/get-bill-info?tokenId=' + to0kenId)
            .pipe(
                catchError((error) => {
                    throw this.toastService.showError(error.message);
                })
            );
    }

    getBillDetails(token_id: number): Observable<IapiResponce<IBillDetails>> {
        return this.http
            .get<IapiResponce<IBillDetails>>(
                'v1/BillChecking/get-bill-details?tokenId=' + token_id
            )
            .pipe(
                catchError((error) => {
                    throw this.toastService.showError(error.message);
                })
            );
    }
    getAllotmentDetils(token_id: number): Observable<IapiResponce<AllotmentDetails>> {
        return this.http
            .get<IapiResponce<AllotmentDetails>>(
                'v1/BillChecking/get-allotment-details?tokenId=' + token_id
            )
            .pipe(
                catchError((error) => {
                    throw this.toastService.showError(error.message);
                })
            );
    }
    getECSNEFTDetils(token_id: number): Observable<IapiResponce<ECS_NEFT>> {
        return this.http
            .get<IapiResponce<ECS_NEFT>>(
                'v1/BillChecking/get-ecs-neft-details?tokenId=' + token_id
            )
            .pipe(
                catchError((error) => {
                    throw this.toastService.showError(error.message);
                })
            );
    }
    getByTransferDetails(token_id: number): Observable<IapiResponce<ByTransferDetails>> {
        return this.http.get<IapiResponce<ByTransferDetails>>('v1/BillChecking/get-bt-details?tokenId=' + token_id).pipe(catchError((error) => {
            throw this.toastService.showError(error.message);
        }));
    }
    getChequeDetails(token_id: number): Observable<IapiResponce<IChequeDetails>> {
        return this.http.get<IapiResponce<IChequeDetails>>('v1/BillChecking/get-cheque-details?tokenId=' + token_id).pipe(catchError((error) => {
            throw this.toastService.showError(error.message);
        }));
    }
    getReturnMemoBillDetails(token_id: number): Observable<IapiResponce<IRetunMemoBillDetils>> {
        return this.http
            .get<IapiResponce<IRetunMemoBillDetils>>(
                'v1/ReturnMemo/ReturnMemoBillDetails/' + token_id
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

    saveReturnMemo(billCheck: IBillCheck) {
        return this.http.post<IapiResponce>('v1/ReturnMemo/Generate', billCheck).pipe(
            catchError((error) => {
                throw this.toastService.showError(error.message);
            })
        )
    }

    getReturnMemoCount(): Observable<IapiResponce> {
        return this.http.get<IapiResponce<IReturnMemoCount>>("v1/ReturnMemo/ReturnMemoCount").pipe(
            catchError((error) => {
                throw this.toastService.showError(error.message);
            })
        );
    }

}
