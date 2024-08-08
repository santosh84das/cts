/**
 * CTS-BE
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { DateOnly } from './date-only';


export interface PensionerEntryDTO { 
    receiptId?: number;
    ppoNo?: string | null;
    ppoType?: string;
    ppoSubType?: string;
    categoryId?: number;
    pensionerName?: string | null;
    gender?: string | null;
    dateOfBirth?: DateOnly;
    mobileNumber?: string | null;
    emailId?: string | null;
    pensionerAddress?: string | null;
    identificationMark?: string | null;
    panNo?: string | null;
    aadhaarNo?: string | null;
    dateOfRetirement?: DateOnly;
    dateOfCommencement?: DateOnly;
    basicPensionAmount?: number;
    commutedPensionAmount?: number;
    enhancePensionAmount?: number;
    reducedPensionAmount?: number;
    religion?: string;
}

