import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { IBillCheck, ISelectedObjection, ISelectedObjectionsForOverrule } from 'src/app/core/models/bill';
import { IObjection, ISetNewObjection, TokenWithObjections } from 'src/app/core/models/objection';
import { BillService } from 'src/app/core/services/Bill/bill.service';
import { TokenService } from 'src/app/core/services/Token/token.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ObjectionService } from 'src/app/core/services/objection.service';
import { ToastService } from 'src/app/core/services/toast.service';
@Component({
    selector: 'app-list-of-objection',
    templateUrl: './list-of-objection.component.html',
    styleUrls: ['./list-of-objection.component.scss'],
    providers: [ConfirmationService]
})
export class ListOfObjectionComponent implements OnInit {
    @ViewChild('remarkPanel') remarkPanel!: OverlayPanel;
    @ViewChild('overruleRemarkPanel') overruleRemarkPanel!: OverlayPanel;

    gobalObjections: IObjection[] = [];
    localObjections: IObjection[] = [];
    tokenObjections: TokenWithObjections[] = [];
    newObjection: string = '';
    objectionRemarks: string = '';
    // SetNewObjection : ISetNewObjection | any;
    selectedGobalObjections: IObjection[] = [];
    selectedLocalObjections: any;
    billCheckDetails: IBillCheck | any;
    isOverruleSelected: boolean = false;
    selectedObjectionsForOverrule: ISelectedObjectionsForOverrule[] = [];
    overruleRemarks: string | any;
    selectedObjections: ISelectedObjection[] = [];
    currentIndex!: number;
    currentEvent!: any;
    submitButtonLabel: string = "Object";
    isRevertButton: boolean = false;
    constructor(
        private billService: BillService,
        private objectionService: ObjectionService,
        private toastservice: ToastService,
        private tokenServce: TokenService,
        private router: Router,
        private confirmationService: ConfirmationService,
        private notificationService: NotificationService,
        private authService: AuthService,
    ) { }
    ngOnInit(): void {
        this.gobalObjection();
        this.tokenObjection(this.tokenServce.selectedId);
        this.isTrasuryOfficerLoggedIn()
    }
    private gobalObjection() {
        this.objectionService.getGobalObjection().subscribe((response) => {
            if (response.apiResponseStatus == 1) {
                this.gobalObjections = response.result;
                return;
            }
            this.toastservice.showAlert(response.message, response.apiResponseStatus);
        });
    }
    public setSelectedObjection(event: any) {
        const isSelected = this.selectedGobalObjections.includes(event.option);
        if (isSelected) {
            console.log(event.option);

            this.addToSelectedObjections(event.option);
        } else {
            this.removeFromSelectedObjections(event.option);
        }
        this.setSubmitButtonLabel();
    }
    public removeObjection(selectedObjection: any) {
        if (this.selectedGobalObjections !== undefined) {
            this.selectedGobalObjections = this.selectedGobalObjections.filter((obj: any) => obj !== selectedObjection);
        }
        this.removeFromSelectedObjections(selectedObjection);
        this.setSubmitButtonLabel();
    }
    public objectionOverrule() {
        this.selectedObjections[this.currentIndex].isOverruled = true;
        this.selectedObjections[this.currentIndex].overruledRemark = this.overruleRemarks;
        this.selectedObjections[this.currentIndex].OverruledBy = 'You';

        const a: ISelectedObjectionsForOverrule = {
            tokenObjectionId: this.selectedObjections[this.currentIndex].exiestObjectionId,
            remark: this.selectedObjections[this.currentIndex].overruledRemark
        }
        this.selectedObjectionsForOverrule.push(a)
        this.overruleRemarks = undefined;
        this.overruleRemarkPanel.toggle(this.currentEvent);
        this.setSubmitButtonLabel();
    }
    public undoObjectionOverrule(index: number) {
        this.selectedObjections[index].isOverruled = false;
        this.selectedObjections[index].overruledRemark = undefined;
        const objectionId = this.selectedObjections[index].exiestObjectionId;
        this.selectedObjectionsForOverrule = this.selectedObjectionsForOverrule.filter(obj => obj.tokenObjectionId !== objectionId);
        console.log(this.selectedObjectionsForOverrule);
        this.setSubmitButtonLabel();
    }
    public addLocalObjection() {
        const localObjection: ISelectedObjection = {
            description: this.newObjection,
            objectionType: "Local"
        }
        this.addToSelectedObjections(localObjection);
        this.newObjection = "";
        this.setSubmitButtonLabel();
    }
    private addToSelectedObjections(option: any) {
        if (!this.selectedObjections.includes(option)) {
            this.selectedObjections.push(option);
        }
    }

    private removeFromSelectedObjections(option: any) {
        this.selectedObjections = this.selectedObjections.filter(obj => obj !== option);
    }
    public addObjectionRemark() {
        this.selectedObjections[this.currentIndex].remark = this.objectionRemarks;
        this.objectionRemarks = "";
        this.setSubmitButtonLabel();
    }
    tokenObjection(tokenId: number) {
        this.objectionService.getTokenObjections(tokenId).subscribe((response) => {
            if (response.apiResponseStatus == 1) {
                // this.tokenObjections = response.result;
                this.selectedObjections = response.result.map((tokenObjections: TokenWithObjections) => {
                    return {
                        id: tokenObjections.objectionId,
                        description: tokenObjections.objectionDescription,
                        remark: tokenObjections.objectionRemark,
                        exiestObjectionId: tokenObjections.id,
                        objectionType: tokenObjections.objectionType,
                        objectionBy: tokenObjections.objectionBy,
                        isOverruled: tokenObjections.isOverruled,
                        OverruledBy: tokenObjections.objectionBy,
                    }
                });
                console.log('null', this.selectedObjections);

                const currentlySlectedGobalObjections: IObjection[] = response.result.filter((r: { objectionType: string; }) => r.objectionType == "Global").map((tokenObjections: TokenWithObjections) => {
                    return {
                        id: tokenObjections.objectionId,
                        description: tokenObjections.objectionDescription
                    }
                });
                const stringifiedArray = currentlySlectedGobalObjections.map((elm: IObjection) => { return JSON.stringify(elm) });
                this.gobalObjections = this.gobalObjections.filter((gobalObjection: IObjection) => !stringifiedArray.includes(JSON.stringify(gobalObjection)));
                this.setSubmitButtonLabel();
                return;
            }
            this.setSubmitButtonLabel();
            this.toastservice.showAlert(response.message, response.apiResponseStatus);
        });
    }
    setSubmitButtonLabel() {
        if (this.selectedObjections.length > 0 && this.selectedObjections.some(objection => !objection.isOverruled)) {
            this.submitButtonLabel = 'Object';
        } else {
            this.submitButtonLabel = 'Approve';
        }
    }

    billCheck() {
        this.billCheckDetails = {
            tokenId: this.tokenServce.selectedId,
            referenceNo: this.tokenServce.selectedTokenRef,
            billObjections: {
                globalObjections: (this.selectedGobalObjections != null) ? this.selectedObjections.filter(objection => objection.id !== undefined && objection.exiestObjectionId == undefined).map(objection => objection) : [],
                localObjections: (this.selectedObjections != null) ? this.selectedObjections.filter(objection => objection.id === undefined && objection.exiestObjectionId == undefined).map(objection => objection) : []
            },
            overruledObjections: this.selectedObjectionsForOverrule,
        }
        console.log('hi', this.billCheckDetails);

        this.billService.billCheck(this.billCheckDetails).subscribe((response) => {
            if (response.apiResponseStatus == 1) {
                this.notificationService.success(response.message);
                this.router.navigate(['/bill-checking']);
            }
            this.toastservice.showAlert(response.message, response.apiResponseStatus);
        });
    }
    openRemarkPanel(event: any, index: number) {
        this.currentIndex = index;
        this.remarkPanel.toggle(event);
    }
    openOverruleRemarkPanel(event: any, index: number) {
        this.currentIndex = index;
        this.currentEvent = event;
        this.overruleRemarkPanel.toggle(event);
    }
    confirm(event: Event | any) {
        this.confirmationService.confirm({
            target: event.target,
            message: 'Are you sure that you want to proceed?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                // this.insertNewObjection();
            },
            reject: () => {
                //reject action
            }
        });
    }
    onRowSelectUnselect(event: any) {
        if (this.selectedObjectionsForOverrule?.length != 0) {
            this.isOverruleSelected = true;
        } else {
            this.isOverruleSelected = false;
        }
    }
    prevStep() {
        this.router.navigate(['/bill-checking/new-bill-check/bill-details']);
    }

    isTrasuryOfficerLoggedIn() {
        if (this.authService.getUserDetails().Role == 'treasury-officer') {
            this.isRevertButton = true;
        }

    }
    confirmRevert(event: Event, index:number) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Are you sure that you want to revert?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptIcon: "none",
            rejectIcon: "none",
            rejectButtonStyleClass: "p-button-text",
            accept: () => {
                this.revertObjectionOverruled(index);
            },
            reject: () => {

            }
        });
    }
    revertObjectionOverruled(index: number) {
        this.selectedObjections[index].isOverruled = false;
        this.selectedObjections[index].overruledRemark = undefined;
        const objectionId = this.selectedObjections[index].exiestObjectionId;
        this.selectedObjectionsForOverrule = this.selectedObjectionsForOverrule.filter(obj => obj.tokenObjectionId !== objectionId);
        console.log(this.selectedObjectionsForOverrule);
        this.setSubmitButtonLabel();
    }

}