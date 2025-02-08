import { GugbabResponseGugbabResponseHeaderObjectSampleOracleDTO } from '../../../../components';
/**
 * Parameter of (get) /data/guide/sample/exception/unknown-server-error
 * - [AA] Guide.Sample.Exception-예외 발생 케이스 예제 (SAMPLE_UNKNOWN_SERVER_ERROR)
 */
export interface DataGuideSampleExceptionUnknownServerErrorGetParameters {
  /**
   * 데이터
   * @example abc*
   **/
  paramData: string;
}

/**
 * Response body of (get) /data/guide/sample/exception/unknown-server-error
 * - [AA] Guide.Sample.Exception-예외 발생 케이스 예제 (SAMPLE_UNKNOWN_SERVER_ERROR)
 **/
export type DataGuideSampleExceptionUnknownServerErrorGetResponse =
  GugbabResponseGugbabResponseHeaderObjectSampleOracleDTO;
