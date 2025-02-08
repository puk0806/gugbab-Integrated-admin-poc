import { GugbabResponseGugbabResponseHeaderObjectSampleOracleDTO } from '../../../../components';
/**
 * Parameter of (get) /data/guide/sample/exception/type-mismatch-error
 * - [AA] Guide.Sample.Exception-예외 발생 케이스 예제 (EXHIBITION_TYPE_MISMATCH_ERROR)
 */
export interface DataGuideSampleExceptionTypeMismatchErrorGetParameters {
  /**
   * 이메일 주소
   * @example @mail.pe.kr
   **/
  email: string;
}

/**
 * Response body of (get) /data/guide/sample/exception/type-mismatch-error
 * - [AA] Guide.Sample.Exception-예외 발생 케이스 예제 (EXHIBITION_TYPE_MISMATCH_ERROR)
 **/
export type DataGuideSampleExceptionTypeMismatchErrorGetResponse =
  GugbabResponseGugbabResponseHeaderObjectSampleOracleDTO;
