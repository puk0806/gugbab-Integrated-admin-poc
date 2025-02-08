import {
  SampleOracleRequestDTO,
  GugbabResponseGugbabResponseHeaderObjectSampleOracleResponseDTO,
} from '../../../../../components';

/**
 * Request body of (put) /data/guide/sample/brand/xml/and-find
 * - [AA] Guide.Sample.Oracle-브랜드 정보 단건 변경(use XML)후, 변경된 데이터 조회
 **/
export type DataGuideSampleBrandXmlAndFindPutRequest = SampleOracleRequestDTO;

/**
 * Response body of (put) /data/guide/sample/brand/xml/and-find
 * - [AA] Guide.Sample.Oracle-브랜드 정보 단건 변경(use XML)후, 변경된 데이터 조회
 **/
export type DataGuideSampleBrandXmlAndFindPutResponse = GugbabResponseGugbabResponseHeaderObjectSampleOracleResponseDTO;
