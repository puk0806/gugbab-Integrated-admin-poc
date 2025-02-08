import { InternalProductCodeEnum, EnableCodeEnum } from '../enum';
/**
 *
 * @example
 **/
export interface SampleMySqlRequestDTO {
  /**
   * 카드 아이디
   * @example 226348
   **/
  id: number;
  /**
   * 템플릿 번호
   * @example 74
   **/
  templateType: number;
  /**
   * 변경한 아이디
   * @example kseoyoon
   **/
  modifierId: string;
}

/**
 *
 * @example
 **/
export interface GugbabResponseHeaderObject {
  /**
   * OneSphere API 응답 헤더에서 사용하는 결과 코드 값
   * @example SUCCESS_FIND
   **/
  resultCode: string;
  /**
   * OneSphere API 응답 헤더로 전파되는 메시지
   * @example 1 건 조회되었습니다.
   **/
  message: string;
  /**
   * OneSphere API 응답 헤더에서 사용하는 추가 정보 객체
   * @example Success Found
   **/
  detail: Record<string, unknown>;
}

/**
 *
 * @example
 **/
export interface SampleMySqlDTO {
  /**
   * 카드 아이디
   * @example 226348
   **/
  id: number;
  /**
   * 템플릿 번호
   * @example 74
   **/
  templateType: number;
  /**
   * 등록한 아이디
   * @example kseoyoon
   **/
  creatorId: string;
  /**
   * 등록 일시
   * @example
   **/
  createYmdt: string;
  /**
   * 변경한 아이디
   * @example kseoyoon
   **/
  modifierId: string;
  /**
   * 변경 일시
   * @example
   **/
  modifyYmdt: string;
}

/**
 *
 * @example
 **/
export interface SampleMySqlResponseDTO {
  /**
   *
   * @example
   **/
  count: number;
  /**
   *
   * @example
   **/
  sampleMySqlDTO: SampleMySqlDTO;
}

/**
 *
 * @example
 **/
export interface PagingInfo {
  /**
   * 한번에 조회할 Record 수
   * @example 20
   **/
  pagingWindowSize: number;
  /**
   * 전체 Record 수
   * @example 1000
   **/
  rowsTotalCount: number;
  /**
   * 현재 페이지 위치
   * @example 1
   **/
  currentPageIndex: number;
  /**
   * 전체 페이지 수
   * @example 23
   **/
  pageTotalCount: number;
  /**
   * Record 시작 위치
   * @example 1
   **/
  itemStartIndex: number;
  /**
   * Record 끝 위치
   * @example 5
   **/
  itemEndIndex: number;
}

/**
 *
 * @example
 **/
export interface GugbabResponseGugbabResponseHeaderObjectSampleMySqlResponseDTO {
  /**
   *
   * @example
   **/
  header: GugbabResponseHeaderObject;
  /**
   *
   * @example
   **/
  body: SampleMySqlResponseDTO;
  /**
   *
   * @example
   **/
  paging: PagingInfo;
}

/**
 *
 * @example
 **/
export interface SampleOracleRequestDTO {
  /**
   * 브랜드 코드
   * @example 11
   **/
  tbrandCode: number;
  /**
   * 브랜드 영문 이름
   * @example TEST BRAND
   **/
  tbrandEName: string;
  /**
   * 브랜드 한글 이름
   * @example 테스트 브랜드
   **/
  tbrandKName: string;
  /**
   * 브랜드 설명
   * @example 테스트용 브랜드입니다.
   **/
  tbrandDescription: string;
  /**
   *
   * @example
   **/
  lgFashionYn: InternalProductCodeEnum;
  /**
   *
   * @example
   **/
  useYn: EnableCodeEnum;
  /**
   * 브랜드 영문 이름 이니셜
   * @example T
   **/
  tbrandENameInitial: string;
  /**
   * 브랜드 한글 이름 이니셜
   * @example ㅌ
   **/
  tbrandKNameInitial: string;
}

/**
 *
 * @example
 **/
export interface SampleOracleDTO {
  /**
   * 브랜드 코드
   * @example 11
   **/
  tbrandCode: number;
  /**
   * 브랜드 영문 이름
   * @example TEST BRAND
   **/
  tbrandEName: string;
  /**
   * 브랜드 한글 이름
   * @example 테스트 브랜드
   **/
  tbrandKName: string;
  /**
   * 브랜드 설명
   * @example 테스트용 브랜드입니다.
   **/
  tbrandDescription: string;
  /**
   *
   * @example
   **/
  lgFashionYn: InternalProductCodeEnum;
  /**
   *
   * @example
   **/
  useYn: EnableCodeEnum;
  /**
   * 등록자 아이디
   * @example bhakee
   **/
  registerId: string;
  /**
   * 등록 일시
   * @example
   **/
  registerDateTime: string;
  /**
   * 변경 일시
   * @example
   **/
  updateDateTime: string;
  /**
   * 브랜드 영문 이름 이니셜
   * @example T
   **/
  tbrandENameInitial: string;
  /**
   * 브랜드 한글 이름 이니셜
   * @example ㅌ
   **/
  tbrandKNameInitial: string;
}

/**
 *
 * @example
 **/
export interface SampleOracleResponseDTO {
  /**
   *
   * @example
   **/
  count: number;
  /**
   *
   * @example
   **/
  sampleOracleDTO: SampleOracleDTO;
}

/**
 *
 * @example
 **/
export interface GugbabResponseGugbabResponseHeaderObjectSampleOracleResponseDTO {
  /**
   *
   * @example
   **/
  header: GugbabResponseHeaderObject;
  /**
   *
   * @example
   **/
  body: SampleOracleResponseDTO;
  /**
   *
   * @example
   **/
  paging: PagingInfo;
}

/**
 *
 * @example
 **/
export interface AwsS3PreSignedUrlRequestDTO {
  /**
   * 업로드객체 Key 값
   * @example 2024/abcd_abcdefghijklmnopqrstuvwxyz.jpg
   **/
  key: string;
  /**
   * url 유효시간 단위: 분
   * @example 5
   **/
  expirationMinutes: number;
  /**
   * S3 버킷 타입
   * @example IMAGE_BANNER
   **/
  s3BucketTypeCodeEnum: string;
}

/**
 *
 * @example
 **/
export interface GugbabResponseGugbabResponseHeaderObjectSampleOracleDTO {
  /**
   *
   * @example
   **/
  header: GugbabResponseHeaderObject;
  /**
   *
   * @example
   **/
  body: SampleOracleDTO;
  /**
   *
   * @example
   **/
  paging: PagingInfo;
}

/**
 *
 * @example
 **/
export interface SampleMySqlMultipleResponseDTO {
  /**
   *
   * @example
   **/
  count: number;
  /**
   *
   * @example
   **/
  sampleMySqlDtoList: SampleMySqlDTO[];
}

/**
 *
 * @example
 **/
export interface GugbabResponseGugbabResponseHeaderObjectSampleMySqlMultipleResponseDTO {
  /**
   *
   * @example
   **/
  header: GugbabResponseHeaderObject;
  /**
   *
   * @example
   **/
  body: SampleMySqlMultipleResponseDTO;
  /**
   *
   * @example
   **/
  paging: PagingInfo;
}

/**
 *
 * @example
 **/
export interface SampleOracleMultipleResponseDTO {
  /**
   *
   * @example
   **/
  count: number;
  /**
   *
   * @example
   **/
  sampleOracleDtoList: SampleOracleDTO[];
}

/**
 *
 * @example
 **/
export interface GugbabResponseGugbabResponseHeaderObjectSampleOracleMultipleResponseDTO {
  /**
   *
   * @example
   **/
  header: GugbabResponseHeaderObject;
  /**
   *
   * @example
   **/
  body: SampleOracleMultipleResponseDTO;
  /**
   *
   * @example
   **/
  paging: PagingInfo;
}
