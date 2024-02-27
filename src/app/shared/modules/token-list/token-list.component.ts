import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStatus } from 'src/app/core/enum/common';
import { IBillDetails } from 'src/app/core/models/bill';
import { DynamicList, DynamicListQueryParameters, FilterParameter } from 'src/app/core/models/dynamic-list';
import { tokenDetails } from 'src/app/core/models/token';
import { BillService } from 'src/app/core/services/Bill/bill.service';
import { TokenService } from 'src/app/core/services/Token/token.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-token-list',
  templateUrl: './token-list.component.html',
  styleUrls: ['./token-list.component.scss']
})
export class TokenListComponent implements OnInit {

  @Input() actionRoute:string|any;  
  @Input() actionButtonClass:string="";  
  @Input() listType:string="";  
  @Input() isAllToken:number =  0;  
  @Input() apiPath:string |any;
  @Input() actionLable:string |any;
  @Input() actionIcon:string |any;
  tokens: tokenDetails[][] | any;
  listData: DynamicList<tokenDetails>|any;
  loading:boolean = false;
  filterParams: FilterParameter[] = [];
  refreshTable:boolean = false;
  sortOrder: number |any;

  sortField: string | any;

  constructor(private tokenServices:TokenService, private toastService:ToastService, private router:Router) { }

  ngOnInit(): void {
    if(this.isAllToken!=0){
      this.allTokenList();
    }else{
      this.tokensList(this.listType);
    }
  }
  //=============================
  action(selectedToken:tokenDetails) {
    this.setTokenDetils(selectedToken);
    this.tokenServices.actionButtonClicked();
  }
  //=============================
  allTokenList(){
    this.tokenServices.getAllToken().subscribe((response)=>{
      if(response.apiResponseStatus==1){
        this.tokens = response.result;
      }
      else{
        this.toastService.showAlert(response.message,response.apiResponseStatus);
      }
    });
  }
  tokensList(listType:string){
    const queryParameters:DynamicListQueryParameters = {
      listType: listType,
      pageSize: 10,
      pageIndex: 0,
      filterParameters: this.filterParams
    }
    this.tokenServices.getTokens(this.apiPath,queryParameters).subscribe((response)=>{
      if(response.apiResponseStatus==1){
        this.listData = response.result;
        // this.tokens = response.result;
      }
      else{
        this.toastService.showAlert(response.message,response.apiResponseStatus);
      }
    });
  }
  setTokenDetils(selectedToken:tokenDetails){
    this.tokenServices.selectedId= selectedToken.tokenId;
    this.tokenServices.selectedTokenNo= selectedToken.tokenNumber;
    this.tokenServices.selectedTokenDate = selectedToken.tokenDate;
    this.tokenServices.selectedTokenRef = selectedToken.referenceNo;
  }
  // tokenFeatures(tokenId:number,tokenNo:Number, tokenDate:Date,tokenRef:number){
  //   this.tokenServices.selectedId= tokenId;
  //   this.tokenServices.selectedTokenNo= tokenNo;
  //   this.tokenServices.selectedTokenDate = tokenDate;
  //   this.tokenServices.selectedTokenRef = tokenRef;
  //   this.router.navigate([this.actionRoute]);
  // }
  test(event: any) {
    const originalObject = event.filters;
    const convertedFilters: FilterParameter[] = [];
  
    // Store previously processed filters to avoid duplicates
    const processedFilters = new Set<string>();
  
    for (const key in originalObject) {
      const filterObject = originalObject[key][0];
  
      // Check if value has changed and filter hasn't been processed
      const filterKey = `${key}-${filterObject.value}`;
      if (filterObject.value !== null && !processedFilters.has(filterKey)) {
        processedFilters.add(filterKey);
        convertedFilters.push({
          field: this.uppercaseFirstLetter(key),
          value: filterObject.value.toString(),
          operator: filterObject.matchMode,
        });
      }
    }
  
    // Update filterParams only if there are changes
    if (JSON.stringify(this.filterParams) !== JSON.stringify(convertedFilters)) {
      this.filterParams = convertedFilters;
      this.tokensList(this.listType);
    }
  }
  lowercaseFirstLetter(input: string): string {
    const [firstLetter, ...rest] = input;
    return `${firstLetter.toLowerCase()}${rest.join('')}`;
  }
  uppercaseFirstLetter(input: string): string {
    const [firstLetter, ...rest] = input;
    return `${firstLetter.toLocaleUpperCase()}${rest.join('')}`;
  }
  onSortChange(event:any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
    }
    else {
        this.sortOrder = 1;
        this.sortField = value;
    }
}
}
