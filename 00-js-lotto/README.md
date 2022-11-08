<p align="middle" >
  <img width="200px;" src="./src/images/lotto_ball.png"/>
</p>
<h2 align="middle">행운의 로또</h2>
<p align="middle">자바스크립트로 구현 하는 로또 어플리케이션</p>
<p align="middle">
  <img src="https://img.shields.io/badge/version-1.0.0-blue?style=flat-square" alt="template version"/>
  <img src="https://img.shields.io/badge/language-html-red.svg?style=flat-square"/>
  <img src="https://img.shields.io/badge/language-css-blue.svg?style=flat-square"/>
  <img src="https://img.shields.io/badge/language-js-yellow.svg?style=flat-square"/>
  <img src="https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square"/>
</p>

<p align="middle">
  <a href="https://next-step.github.io/js-lotto/">🖥️ 데모 링크</a>
</p>

## 🔥 Projects!

<p align="middle">
  <img width="400" src="./src/images/lotto_ui.png">
</p>

### 🎯 step1 구입 기능

- [ ] 로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급해야 한다.
- [ ] 로또 1장의 가격은 1,000원이다.
- [ ] 소비자는 **자동 구매**를 할 수 있어야 한다.
- [ ] 복권 번호는 번호보기 토글 버튼을 클릭하면, 볼 수 있어야 한다.

### 🎯🎯 step2 당첨 결과 기능

- [ ] 결과 확인하기 버튼을 누르면 당첨 통계, 수익률을 모달로 확인할 수 있다.
- [ ] 로또 당첨 금액은 고정되어 있는 것으로 가정한다.
- [ ] 다시 시작하기 버튼을 누르면 초기화 되서 다시 구매를 시작할 수 있다.

<br>

## ⚙️ Before Started

#### <img alt="Tip" src="https://img.shields.io/static/v1.svg?label=&message=Tip&style=flat-square&color=673ab8"> 로컬에서 서버 띄워서 손쉽게 static resources 변경 및 확인하는 방법

로컬에서 웹서버를 띄워 html, css, js 등을 실시간으로 손쉽게 테스트해 볼 수 있습니다. 이를 위해서는 우선 npm이 설치되어 있어야 합니다. 구글에 `npm install` 이란 키워드로 각자의 운영체제에 맞게끔 npm을 설치해주세요. 이후 아래의 명령어를 통해 실시간으로 웹페이지를 테스트해볼 수 있습니다.

```
npm install -g live-server
```

실행은 아래의 커맨드로 할 수 있습니다.

```
live-server 폴더명
```

<br/>

## 👏 Contributing

만약 미션 수행 중에 개선사항이 보인다면, 언제든 자유롭게 PR을 보내주세요.

<br/>

## 🐞 Bug Report

버그를 발견한다면, [Issues](https://github.com/next-step/js-lotto/issues)에 등록해주세요.

<br/>

## 📝 License

This project is [MIT](https://github.com/next-step/js-lotto/blob/main/LICENSE) licensed.

## 로직

### 구입 기능
- [x] 구입 금액은 천원 단위
- [x] 최소 금액은 1,000 / 최대 금액은 100,000 (html, min, max)
- [x] 페이지 로드시 구입 입력란에 자동 포커싱 

### 로또 번호 확인
- [x] 로또를 구매하면 금액 만큼의 로또를 확인할 수 있다. 
- [x] 번호 보기를 토글하면 번호를 확인할 수 있다.

### 로또 당첨 확인하기
- [x] 로또 당첨 확인을 위해 당첨 번호를 입력할 수 있다. (당첨번호 + 보너스 넘버)
- [x] 당첨번호 와 보너스 번호를 모두 입력하면 결과 확인을 할 수 있다.  
  모두 입력하지 않고 버튼을 클릭하면 입력란에 focus (html 속성으로 해결)
- [x] 당첨번호와 보너스 번호는 중복될 수 없다.

### 결과 확인 기능
- 모달 창을 이용하여 결과 확인란 구현   
  로또 당첨 확인할 때, 모달을 이용하여 당첨 결과를 보여준다.

  - [x] 로또 당첨 금액은 정해져있다.   
    (3개-5000, 4개-50000, 5개- 1500000, 5개+보너스볼-3000000, 6개-200000000)
  - [x] 당첨 통계를 보여준다. (로또 하나당 당첨률)
  - [x] 총 수익률을 보여준다. (로또 구매 금액과 당첨금의 수익률)  
    수익률 계산: `(손익(평가금액-투자원금)) / 투자원금 * 100`
  - [x] 다시 시작하기 버튼을 누르면 초기화되어 다시 구매할 수 있다. 
