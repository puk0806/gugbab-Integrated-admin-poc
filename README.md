## local https ssl 인증
1. mkcert 설치
    - ```brew install mkcert```
2. 인증서 설치 (설치 이후 브라우저 전체 재시작 필요)
    - ```mkcert -install```
3. 인증서 설치 폴더 이동
    - ```cd apps/gugbab-next-admin```
4. 인증서 발급
    - ```mkcert -key-file cert/local-key.pem -cert-file cert/local-cert.pem gugbab.co.kr local.gugbab.co.kr```
5. 호스트 추가
    - 호스트 설정파일 열기
        ```sudo vim /private/etc/hosts```
    - 호스트 추가
        ```127.0.0.1 local.gugbab.co.kr```
