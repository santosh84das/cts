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


export interface PpoComponentRateResponseDTO { 
    dataSource?: { [key: string]: any; } | null;
    ppoId: number;
    breakupId: number;
    fromDate: DateOnly;
    toDate?: DateOnly;
    amountPerMonth: number;
    id?: number;
}

