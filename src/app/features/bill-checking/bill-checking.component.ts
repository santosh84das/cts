import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs/internal/Subscription';
import { StatusType } from 'src/app/core/enum/common';
import {
    DynamicList,
    IActionButtonConfig,
} from 'src/app/core/models/dynamic-table';
import { tokenDetails } from 'src/app/core/models/token';
import { TokenService } from 'src/app/core/services/Token/token.service';

@Component({
    selector: 'app-bill-checking',
    templateUrl: './bill-checking.component.html',
    styleUrls: ['./bill-checking.component.scss'],
})
export class BillCheckingComponent implements OnInit {
    StatusType = StatusType;
    routeItems: MenuItem[] = [];
    tableActionButton: IActionButtonConfig[] = [];
    private subscribtion: Subscription | any;
    constructor(private tokenServices: TokenService, private router: Router) {}

    ngOnInit(): void {
        this.subscribtion = this.tokenServices
            .getActionButtonObservable()
            .subscribe((data) => {
                this.setToBillCheck();
            });
        this.tableActionButton = [
            {
                buttonIdentifier: 'test',
                class: 'p-button-rounded p-button-danger p-button-raised',
                icon: 'pi pi-times',
                lable: 'test',
            },
            {
                buttonIdentifier: 'test2',
                class: '',
                icon: 'pi pi-times',
                lable: 'test2',
            },
        ];
        this.routeItems = [
            { label: 'Bill Details', routerLink: 'personal' },
            { label: 'List Of Objection', routerLink: 'role' },
            // { label: 'BY Transfer', routerLink: 'confirmation' },
            // { label: 'PL Transfer', routerLink: 'confirmation' },
        ];
    }
    ngOnDestroy() {
        this.subscribtion.unsubscribe();
    }
    setToBillCheck() {
        this.router.navigate(['/bill-checking/new-bill-check/bill-details']);
    }
    closeButton(event: any) {
        console.log('functioncall', event);
        this.router.navigate(['/']);
    }
    handleRowSelection(event:any){
      console.log(event);
    }
    handleButtonClick(event: any) {
        // const { buttonIdentifier, rowId } = eventData;
        // // Handle button click action based on button identifier and row id
        // switch (buttonIdentifier) {
        //     case 'button1':
        //         console.log(`Button 1 clicked in parent for row with id ${rowId}`);
        //         // Handle button 1 action
        //         break;
        //     case 'button2':
        //         console.log(`Button 2 clicked in parent for row with id ${rowId}`);
        //         // Handle button 2 action
        //         break;
        //     default:
        //         console.log(`Unknown button clicked in parent for row with id ${rowId}`);
        //         break;
        // }
        console.log(event);
    }
}
