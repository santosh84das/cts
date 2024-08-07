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
import { PensionBreakupResponseDTO } from './pension-breakup-response-dto';


export interface ComponentRateResponseDTO { 
    dataSource?: { [key: string]: any; } | null;
    categoryId?: number;
    breakupId?: number;
    breakup?: PensionBreakupResponseDTO;
    effectiveFromDate: DateOnly;
    rateAmount?: number;
    rateType?: string;
    id?: number;
}

