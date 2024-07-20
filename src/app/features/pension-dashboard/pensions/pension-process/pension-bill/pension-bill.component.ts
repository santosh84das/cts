import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PentionDetailComponent } from './../pention-detail/pention-detail.component';
import { MenuItem } from 'primeng/api';
import {PensionProcessComponent} from './../pension-process.component';

@Component({
  selector: 'app-pension-bill',
  templateUrl: 'pension-bill.component.html',
  styles: [`:host ::ng-deep .p-menubar-root-list {
    flex-wrap: wrap;
}`]
})
export class PensionBillComponent implements OnInit {

  constructor() { }
  routeItems: MenuItem[] = [];
  ngOnInit(): void {
    this.routeItems = [
        { label: 'Pension Details', routerLink: 'app-persion-detail' },
        { label: 'Seat', routerLink: 'seat' },
        { label: 'Payment', routerLink: 'payment' },
        { label: 'Confirmation', routerLink: 'confirmation' },
    ];
  }

}
