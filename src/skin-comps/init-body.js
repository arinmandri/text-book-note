
//// 블로그 주인 로그인 확인
document.body.classList.add('login-' + T.config.ROLE);

(function(){
  //// 리스트 페이지들 공통 body 클래스 (카테고리 글 리스트, 보관함 글 리스트, 태그 리스트, 검색결과 리스트) (스타일 공통적용 목적)
  let                 _body = document.getElementById('tt-body-category');
  if( _body == null ) _body = document.getElementById('tt-body-tag');
  if( _body == null ) _body = document.getElementById('tt-body-archive');
  if( _body == null ) _body = document.getElementById('tt-body-search');
  if( _body == null ) _body = document.getElementById('tt-body-index');

  const body = _body;
  if( body != null ) body.className = 'tt-body-list';
})();