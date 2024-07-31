export interface Header {
    name: string;
    dataType: string;
    fieldName: string;
    filterField: string;
    filterEnums: any;
    isSortable: boolean;
    isFilterable: boolean;
    objectTypeValueField: any;
  }
  export interface PensionBill {
    ppoId: number;
    pensionerName: string;
    mobileNumber: string;
    dateOfBirth: string;
    dateOfRetirement: string;
    dateOfCommencement: string;
    ppoNo: string;
    dataSource: any;
  }
  export interface ApiResponse {
    result: {
      headers: Header[];
      data: PensionBill[];
      dataCount: number;
    };
    apiResponseStatus: number;
    message: string;
  }
      