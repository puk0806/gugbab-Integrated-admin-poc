import { GugbabResponseGugbabResponseHeaderObjectSampleOracleMultipleResponseDTO } from '../../../../components';
/**
 * Parameter of (get) /data/guide/sample/brands/by-condition
 * - [AA] Guide.Sample.Oracle-브랜드 정보 다건 조회(자사상품 여부, 사용 여부, 등록자 기준)
 */
export interface DataGuideSampleBrandsByConditionGetParameters {
  /**
   * 자사 상품 여부
   * @example OWN_PRODUCT
   **/
  lgFashionYn?: 'OWN_PRODUCT' | 'AFFILIATE_PRODUCT' | 'COMMON_PRODUCT' | 'UNKNOWN_PRODUCT';
  /**
   * 사용 여부
   * @example ENABLE
   **/
  useYn?: 'ENABLE' | 'DISABLE' | 'UNKNOWN';
  /**
   * 등록자 아이디
   * @example jej6789
   **/
  registerId?: string;
}

/**
 * Response body of (get) /data/guide/sample/brands/by-condition
 * - [AA] Guide.Sample.Oracle-브랜드 정보 다건 조회(자사상품 여부, 사용 여부, 등록자 기준)
 **/
export type DataGuideSampleBrandsByConditionGetResponse =
  GugbabResponseGugbabResponseHeaderObjectSampleOracleMultipleResponseDTO;
