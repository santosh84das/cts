import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private isFormValid = new BehaviorSubject<boolean>(false);
  private ppoID = new BehaviorSubject<string>('');
  public object:any =undefined;
  
  isFormValid$ = this.isFormValid.asObservable();
  ppoID$ = this.ppoID.asObservable();

  setFormValid(status: boolean) {
    this.isFormValid.next(status);
  }

  setPPOID(id: string){
    this.ppoID.next(id);
  }

  setObject(obj: any) {
    this.object = obj;
  }
}
