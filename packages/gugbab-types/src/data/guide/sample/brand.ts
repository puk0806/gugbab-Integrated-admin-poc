import {
  SampleOracleRequestDTO,
  GugbabResponseGugbabResponseHeaderObjectSampleOracleResponseDTO,
} from '../../../components';

/**
 * Request body of (put) /data/guide/sample/brand
 * - [AA] Guide.Sample.Oracle-브랜드 정보 단건 변경(without XML)후, 변경된 데이터 조회
 **/
export type DataGuideSampleBrandPutRequest = SampleOracleRequestDTO;

/**
 * Response body of (put) /data/guide/sample/brand
 * - [AA] Guide.Sample.Oracle-브랜드 정보 단건 변경(without XML)후, 변경된 데이터 조회
 **/
export type DataGuideSampleBrandPutResponse = GugbabResponseGugbabResponseHeaderObjectSampleOracleResponseDTO;
