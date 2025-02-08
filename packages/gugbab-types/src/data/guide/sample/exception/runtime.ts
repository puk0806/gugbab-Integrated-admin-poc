import { GugbabResponseGugbabResponseHeaderObjectSampleOracleDTO } from '../../../../components';
/**
 * Parameter of (get) /data/guide/sample/exception/runtime
 * - [AA] Guide.Sample.Exception-예외 발생 케이스 예제 (RuntimeException)
 */
export interface DataGuideSampleExceptionRuntimeGetParameters {
  /**
   * 데이터
   * @example abc*
   **/
  parseValue: string;
}

/**
 * Response body of (get) /data/guide/sample/exception/runtime
 * - [AA] Guide.Sample.Exception-예외 발생 케이스 예제 (RuntimeException)
 **/
export type DataGuideSampleExceptionRuntimeGetResponse = GugbabResponseGugbabResponseHeaderObjectSampleOracleDTO;
