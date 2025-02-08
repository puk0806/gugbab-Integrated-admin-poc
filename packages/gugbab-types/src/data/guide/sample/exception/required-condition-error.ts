import { GugbabResponseGugbabResponseHeaderObjectSampleOracleDTO } from '../../../../components';
/**
 * Parameter of (get) /data/guide/sample/exception/required-condition-error
 * - [AA] Guide.Sample.Exception-예외 발생 케이스 예제 (EXHIBITION_REQUIRED_CONDITION_ERROR)
 */
export interface DataGuideSampleExceptionRequiredConditionErrorGetParameters {
  /**
   * 이메일 주소
   * @example @mail.pe.kr
   **/
  email: string;
}

/**
 * Response body of (get) /data/guide/sample/exception/required-condition-error
 * - [AA] Guide.Sample.Exception-예외 발생 케이스 예제 (EXHIBITION_REQUIRED_CONDITION_ERROR)
 **/
export type DataGuideSampleExceptionRequiredConditionErrorGetResponse =
  GugbabResponseGugbabResponseHeaderObjectSampleOracleDTO;
