
//// 블로그 주인 로그인 확인
document.body.classList.add('login-' + T.config.ROLE);

(function(){
  //// 리스트 페이지들 공통 body 클래스
  const body
    =  document.getElementById('tt-body-category')// 카테고리
    || document.getElementById('tt-body-tag')// 태그 모음, 태그 검색 결과
    || document.getElementById('tt-body-archive')// 보관함
    || document.getElementById('tt-body-search')// 검색 결과
    || document.getElementById('tt-body-index');// 홈화면, 공지사항 목록
  if( body != null ) body.classList.add('tt-body-list');
})();