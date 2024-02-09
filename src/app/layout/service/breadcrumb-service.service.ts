import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  private breadcrumbs = new BehaviorSubject<Array<{ label: string, routerLink: string[] }>>([]);

  getBreadcrumbs() {
    return this.breadcrumbs.asObservable();
  }

  setBreadcrumbs(breadcrumbs: Array<{ label: string, routerLink: string[] }>) {
    this.breadcrumbs.next(breadcrumbs);
  }
}
