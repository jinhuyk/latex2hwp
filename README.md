# $\LaTeX$ to HWP format Convertor
이 도구는 $\LaTeX $ 수식을 Hancom HWP 수식으로 바꾸어주는 기능을 가지고 있습니다.

현재 github-pages를 이용하여 무료로 웹사이트에서 변환을 할 수 있습니다.

---
## Project Introduction
### Developer
Jinhuyk Mun ([@jinhuyk](https://github.com/jinhuyk))

### Language
- React
- Typescript

### Date
- 2025.05.12 ~ Now ( continuous Developing )

### Why make this?
- 최신 AI를 이용하여 PDF를 $\LaTeX$로 변환할 수 있는 기술들이 많아지고 있음 예) MathPix 등..

- 일하는 곳에서도 이러한 AI기술을 이용하여 문서를 제작하는 일을 하고 있음, 하지만 해당 일하는 곳에서는 Hwp (한글) 을 사용하기 때문에, Latex와 Hwp간 수식 입력이 어려움 -> 현재 한글은 독창적인 수식입력기를 사용하고 있음

- 그래서 Latex에서 Hwp로 수식을 변형시킬때, 직접 바꾸는 것이 아닌, Tool을 이용하여 바꾸는 것이 시간 단축에 중요한 쟁점이 될걸로 판단됨

### History
- 초기버전은 Python-Jupyter을 이용하여 개발
해당 개발에는 큰 문제점이 있는데, 어떤 환경에서든 해당 툴을 사용하기 어려움 -> 항상 Google coLab을 이용하거나 하는 문제가 발생

- 그래서 웹에 툴을 만들어야, 어디서든 어떤 환경에서도 사용이 가능할 것이라 판단되어 간단한 버전의 웹을 제작

- 추후 발전을 위해서라면 (기능 추가 등) React를 이용하여 웹을 발전 시키는 것이 좋다고 생각되어 React로 넘어가게 됨

---
## Manual
### Current function
- $\LaTeX$ 의 수식과 글이 담긴 문장의 일부분을 복사 한후, 해당 사이트에 붙여넣기 
- 이후 자동으로 한글 수식에 맞는 문장으로 변형
- 복사 하여, 한글 수식기에 입력하여 사용하면 됨

## 추후 개발 기능
- 한글 스크립트 매크로(Windows 만 지원)을 이용하여, 해당 수식부분을 Box형태로 지정후, 단축키를 누르면 바로 수식으로 바꾸는 방법 개시

- Hwp API 를 이용하여, 문서 전체를 수식부분만 모두 바꿀수 있는 방법 모색 중

- 수식을 넘어서서, Latex 문서 전체를 Hwp로 완벽히 변형할 수 있는지 방법 모색 중 -> 나중의 나의 프로젝트 일부로 활용 가능

- PDF가 들어오면 Latex로 바꿀 수 있는 AI 기능을 활용하여 하나의 프로그램을 제작할 수 있는지 방법 모색 중 -> 나의 프로젝트로 활용 가능


### 그 외..
다양한 Issue 및 토론 부탁드립니다. 
