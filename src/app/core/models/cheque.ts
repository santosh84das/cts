export interface ChequeList {
    series: string, 
    start: number, 
    end: number, 
    quantity: number 
}
export interface ChequeIndentList {
  indentId:number,
  indentDate:string,
  memoNo:string,
  memoDate:string,
  remarks:string,
}
export interface NewChequeEntry {
    series: string, 
    start: number, 
    end: number,
    treasurieCode:string,
    micrCode:string
}

export interface chequeIndent {
    indentId?: number;
    indentDate: string
    memoNumber: string
    memoDate: string
    remarks: string
    chequeIndentDeatils: ChequeIndentDeatil[]
  }
  
  
  export interface ChequeIndentDeatil {
    chequeIndentId?: number;
    chequeType: number
    micrCode: string
    quantity: number
  }

  export interface Serieslist {
    name: string;
    code: Number;
  }
  