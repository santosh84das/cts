export interface GetStampTypes {
    denomination: number;
    isActive?: boolean;
    createdAt?: string;
    createdBy?: number;
}

export interface AddStampType {
    denomination: number;
    isActive?: boolean;
}

export interface GetStampLabels {
    noLabelPerSheet: number;
    isActive?: boolean;
    createdAt?: string;
    createdBy?: number;
}

export interface AddStampLabel {
    noLabelPerSheet: number;
    isActive?: boolean;
}

export interface GetStampCategories {
    stampCategory1: string;
    description: string;
    isActive: boolean;
    createdAt: string;
    createdBy: number;
}

export interface AddStampCategory {
    stampCategory1: string;
    description: string;
    isActive?: boolean;
}

export interface GetStampVendors {
    stampVendorId?: number;
    vendorType: number;
    licenseNo: string;
    address: string;
    phoneNumber: number;
    effectiveFrom: string;
    validUpto: string;
    panNumber: string;
    isActive?: boolean;
    activeAtGrips?: boolean;
    createdAt?: string;
    createdBy?: number;
}

export interface AddStampVendors {
    vendorType: string;
    licenseNo: string;
    address: string;
    phoneNumber: number;
    effectiveFrom: string;
    validUpto: string;
    panNumber: string;
    isActive?: boolean;
    activeAtGrips?: boolean;
}

export interface GetStampDiscountDetails {
    discountId?: number;
    denominationFrom: number;
    denominationTo: number;
    discount: number;
    vendorType: string;
    stampCategory: string;
    isActive?: boolean;
    createdAt?: string;
    createdBy?: number;
}
export interface AddStampDiscountDetails {
    denominationFrom: number;
    denominationTo: number;
    discount: number;
    vendorType: string;
    stampCategory: string;
}

export interface GetStampCombinations {
        stampCombinationId: number,
        stampCategory1: string,
        description: string,
        denomination: number,
        stampDenominationId: number,
        noLabelPerSheet: number,
        stampLabelId: number,
        isActive: true,
        createdAt?: string;
        createdBy?: number;
}


export interface GetStampIndents {
    stampIndentId: number;
    memoNumber: string;
    memoDate: string;
    remarks: string;
    raisedByTreasury: number;
    raisedToTreasury: number;
    stmapCategory: string;
    description: string;
    denomination: number;
    labelPerSheet: number;
    sheet: number;
    label: number;
    quantity: number;
    amount: number;
    status: string;
    createdAt: string;
  }

  export interface AddStampIndent {
    memoNumber: string;
    memoDate: string;
    remarks: string;
    raisedByTreasury: number;
    raisedToTreasury: number;
    stmapCategory: string;
    description: string;
    denomination: number;
    labelPerSheet: number;
    sheet: number;
    label: number;
    quantity: number;
    amount: number;
  }