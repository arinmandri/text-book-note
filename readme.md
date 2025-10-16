## 스킨 적용

1. 이 소스를 [내려받](https://github.com/arinmandri/text-book-note/archive/refs/heads/main.zip)는다.
2. 받은 ZIP 파일의 압출을 푼다.
3. 압축 풀린 파일들 중, `production` 폴더 안에 있는 파일 전체를 티스토리 스킨 등록에 사용한다.





## 스킨 커스텀

### 편집

이 스킨 소스는 jinja2를 이용한다. jinja2 템플릿 문법을 이용하여 렌더링 대상 파일을 편집한다.

렌더링 대상 파일은 `settings.yml`에 정의되어 있다.



### 렌더링

파이썬으로 [`go.py`](https://github.com/arinmandri/text-book-note/blob/main/go.py) 파일을 실행하면 산출물이 나온다.

```
python go.py
```

나온 산출물(기본 경로 `production/`)을 티스토리 스킨 등록에 사용한다.

`ModuleNotFoundError` 오류 발생시 [`requirements.txt`](https://github.com/arinmandri/text-book-note/blob/main/requirements.txt)에 정의된 패키지 설치.

```
pip install -r requirements.txt
```





## …

- [티스토리 스킨 가이드](https://tistory.github.io/document-tistory-skin/)
- [jinja docs](https://jinja.palletsprojects.com/en/stable/)
