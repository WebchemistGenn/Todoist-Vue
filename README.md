## Javscript 주말 스터디 실습 ( Vue로 Todoist Clone 제작 )

[![Netlify Status](https://api.netlify.com/api/v1/badges/c4e2fe7b-584f-4fe1-8321-4b28ed31be4f/deploy-status)](https://app.netlify.com/sites/webchemist-vue-todoist/deploys)

#### Step1
- Vue Typescript 기본 설정
  - typescript & decorator를 적용합니다.
  - tests 폴더 변경 적용과 test 코드 작성
  - stlyelintrc 적용으로 scss의 스타일을 강제합니다.
  - tslint 적용으로 ts의 스타일을 강제합니다.
- 데이터는 임시적으로 localstorage를 이용하여 작성합니다.


#### Step2

- Todoist를 모티브로 변경하기
  - 데이터의 위치를 Store로 변경합니다.
  - Sidebar를 추가합니다.
  - 보관함 / 오늘 / 7일 Routing이 되게 합니다.
  - 기존을 보관함으로 등록하고,  시행날짜를 데이터에 추가합니다. ( 시행날짜가 없을 시 보관함 )
  - 시행날짜에 따라 오늘, 7일에 표시합니다.
  - input창에 단축키를 적용합니다.
  - Test Story를 각 View와 Components에 맞춰서 변경 및 추가합니다.

---

```
Test Story ( Management )
  - FakeData 3개의 일정을 가지고 시작합니다, 그리고 상태는 ALL 입니다.
  - 일정을 추가합니다.
  - 일정을 완료합니다.
  - 상태를 각 차례 변경하여 체크합니다. ( ALL | ACTIVE | COMPLETED )
  - 일정의 완료를 취소합니다.
  - 일정을 삭제합니다.
  - 모든 일정을 초기화합니다.

Test Story ( Today )
  -

Test Story ( Week )
  -

```
