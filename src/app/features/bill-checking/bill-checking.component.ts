import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs/internal/Subscription';
import { tokenDetails } from 'src/app/core/models/token';
import { TokenService } from 'src/app/core/services/Token/token.service';


@Component({
  selector: 'app-bill-checking',
  templateUrl: './bill-checking.component.html',
  styleUrls: ['./bill-checking.component.scss']
})
export class BillCheckingComponent implements OnInit {
  routeItems: MenuItem[]=[];
  private subscribtion :Subscription|any;
  constructor(private tokenServices:TokenService,private router:Router) { }

  ngOnInit(): void {
    this.subscribtion = this.tokenServices.getActionButtonObservable().subscribe((data)=>{
        this.setToBillCheck();
    });
    this.routeItems = [
      { label: 'Bill Details', routerLink: 'personal' },
      { label: 'List Of Objection', routerLink: 'role' },
      // { label: 'BY Transfer', routerLink: 'confirmation' },
      // { label: 'PL Transfer', routerLink: 'confirmation' },
    ];
  }
  ngOnDestroy(){
    this.subscribtion.unsubscribe();
  }
  setToBillCheck(){
    this.router.navigate(["/bill-checking/new-bill-check/bill-details"]);
  }
}
