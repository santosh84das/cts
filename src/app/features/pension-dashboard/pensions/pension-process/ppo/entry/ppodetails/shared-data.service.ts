import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private isFormValid = new BehaviorSubject<boolean>(false);
  
  isFormValid$ = this.isFormValid.asObservable();

  setFormValid(status: boolean) {
    this.isFormValid.next(status);
  }
}
