import { GugbabResponseGugbabResponseHeaderObjectSampleOracleDTO } from '../../../../components';
/**
 * Parameter of (get) /data/guide/sample/exception/permission-error
 * - [AA] Guide.Sample.Exception-예외 발생 케이스 예제 (SAMPLE_PERMISSION_ERROR)
 */
export interface DataGuideSampleExceptionPermissionErrorGetParameters {
  /**
   * 메뉴 이름
   * @example 카드 등록/수정
   **/
  menuName?: string;
  /**
   * 권한 아이디
   * @example RC001122
   **/
  roleId?: string;
}

/**
 * Response body of (get) /data/guide/sample/exception/permission-error
 * - [AA] Guide.Sample.Exception-예외 발생 케이스 예제 (SAMPLE_PERMISSION_ERROR)
 **/
export type DataGuideSampleExceptionPermissionErrorGetResponse =
  GugbabResponseGugbabResponseHeaderObjectSampleOracleDTO;
