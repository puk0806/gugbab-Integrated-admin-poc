import {
  SampleMySqlRequestDTO,
  GugbabResponseGugbabResponseHeaderObjectSampleMySqlResponseDTO,
} from '../../../components';

/**
 * Request body of (put) /data/guide/sample/card
 * - [전시] Exhibition.Card-카드 정보 단건 변경(without XML)후, 변경된 데이터 조회
 **/
export type DataGuideSampleCardPutRequest = SampleMySqlRequestDTO;

/**
 * Response body of (put) /data/guide/sample/card
 * - [전시] Exhibition.Card-카드 정보 단건 변경(without XML)후, 변경된 데이터 조회
 **/
export type DataGuideSampleCardPutResponse = GugbabResponseGugbabResponseHeaderObjectSampleMySqlResponseDTO;

/**
 * Parameter of (get) /data/guide/sample/card/{id}
 * - [전시] Exhibition.Card-카드 정보 단건 조회
 */
export interface DataGuideSampleCardIdGetParameters {
  /**
   *
   * @example
   **/
  id: string;
}

/**
 * Response body of (get) /data/guide/sample/card/{id}
 * - [전시] Exhibition.Card-카드 정보 단건 조회
 **/
export type DataGuideSampleCardIdGetResponse = GugbabResponseGugbabResponseHeaderObjectSampleMySqlResponseDTO;
