export interface ChequeList {
    series: string, 
    start: number, 
    end: number, 
    quantity: number 
}
export interface NewChequeEntry {
    series: string, 
    start: number, 
    end: number,
}

export interface newIndent {
    indentDate: string
    memoNumber: string
    memoDate: string
    remarks: string
    chequeIndentDeatils: ChequeIndentDeatil[]
  }
  
  export interface ChequeIndentDeatil {
    chequeType: number
    micrCode: string
    quantity: number
  }
  