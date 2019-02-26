## Javscript 주말 스터디 ( Vue로 TodoList 제작하기 )

> 현재 Typescript와 Decorator를 적용한 템플릿 연습 중이기 때문에 모두 적용해봅니다.

#### Step1
- Vue Typescript 기본 설정
  - typescript & decorator를 적용합니다.
  - tests 폴더 변경 적용과 test 코드 작성
  - stlyelintrc 적용으로 scss의 스타일을 강제합니다.
  - tslint 적용으로 ts의 스타일을 강제합니다.
- 데이터는 임시적으로 localstorage를 이용하여 작성합니다.
```
Test Story
  - FakeData 3개의 일정을 가지고 시작합니다, 그리고 상태는 ALL 입니다.
  - 일정을 추가합니다.
  - 일정을 완료합니다.
  - 상태를 각 차례 변경하여 체크합니다. ( ALL | ACTIVE | COMPLETED )
  - 일정의 완료를 취소합니다.
  - 일정을 삭제합니다.
  - 모든 일정을 초기화합니다.
```
