# Auth-system
Smilegate Winter Dev Camp 2th, Personal Project : Auth System
> The goal is to implement <strong>various authentication techniques</strong> rather than good performance.

## Description
* Develop authentication system using JWT and others
* Develop Password Encryption
* Manage USER CRUD

## Enviornment
* Docker Ubuntu 22.04.1 LTS ( Latest )

## FrameWork
* Frontend : [React][React]
* Backend : [Fastapi][Fastapi]
* Database : [Mysql]

## Requirements
- 프로젝트에 대한 개요 [ auth-system & Description ]
- 기술 스택 [ Framework ]
- 코드 중 확인받고 싶은 부분 [Not Yet]


> 개발관련 과정에서 궁금했던 부분 등 [Not Yet]
    
- Frontend에서 Backend로 OAuthPasswordBearer를 하기 위하여 formdata를 넘기는데, 그냥 json으로 넘겨서 토큰을 받으면 되면 안되나요? OAuthPasswordBearer의 장점이 궁금합니다.

- token을 넘겨서 localstorage에 넘기는것 까지는 확인했는데
localstorage의 key를 보면 고정으로 되어있는데 클라이언트마다 다른 localstorage를 사용하는건가요? 클라이안트마다 독립적으로 사용이 가능한 것인가 궁금합니다

- 대부분의 jwt는 refreshtoken을 함께 사용한다고 들었는데
refreshtoken도 같이 로컬스토리지에 보낸다음에 저장해서 사용하면 되는건가요? 만약 그렇다면 refreshtoken과 accesstoken은 어떨때 비교하여 어떻게 backend에서 frontend에 accesstoken을 재발급해주나요?

- react에서 새창이 열리는 것과 같은 다른 세션을 사용하게    됬을때의   로그인이 유지되게끔 하려면 어떻게 해야하나요?
    

[React]: https://github.com/facebook/react "Go react github"
[Fastapi]: https://github.com/tiangolo/fastapi "Go fastapi github"
[Mysql]: https://www.mysql.com/ "Go Mysql"