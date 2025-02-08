import {
  SampleMySqlRequestDTO,
  GugbabResponseGugbabResponseHeaderObjectSampleMySqlResponseDTO,
} from '../../../../components';

/**
 * Request body of (put) /data/guide/sample/card/xml
 * - [전시] Exhibition.Card-카드 정보 단건 변경(use XML)후, 변경된 데이터 조회
 **/
export type DataGuideSampleCardXmlPutRequest = SampleMySqlRequestDTO;

/**
 * Response body of (put) /data/guide/sample/card/xml
 * - [전시] Exhibition.Card-카드 정보 단건 변경(use XML)후, 변경된 데이터 조회
 **/
export type DataGuideSampleCardXmlPutResponse = GugbabResponseGugbabResponseHeaderObjectSampleMySqlResponseDTO;
