
(function(){
  //// 검색결과 페이지인 경우 보기형식: 복잡 목록
  var a = document.querySelector('#tt-body-search #postList')
  if( a != null ) a.className = 'detailed'

  //// 태그 검색 페이지인 경우 보기형식: 간략 목록
  var a = document.querySelector('#tt-body-tag #postList')
  if( a != null ) a.className = 'simple'

  //// 썸네일 없으면 대체이미지
  const thumbnails = document.querySelectorAll('#postList .thumbnail')
  for( let thumbnail of thumbnails ){
    if( thumbnail.getElementsByTagName('img').length == 0 ){
      thumbnail.innerHTML = '<img class="noThumbnail" src="' +noThumbnail+ '">'
    }
  }

  //// 검색어 강조
  if( document.getElementById('tt-body-search') != null ){//검색 페이지일 때만
    var searchword = document.querySelector('#listHead .title').innerText;// 검색어

    let targets = document.querySelectorAll('#postList .title');// 검색어 강조할 곳 1: 글제목
    for( let target of targets )
      target.innerHTML // 문자열 치환: 검색어들을 span 태그로 감싸기
        = target.innerHTML.replaceAll(
          searchword, 
          '<span class="searchword">'+searchword+'</span>');

    targets = document.querySelectorAll('#postList .content')// 검색어 강조할 곳 1: 글본문
    for( let target of targets )
      target.innerHTML // 문자열 치환: 검색어들을 span 태그로 감싸기
        = target.innerHTML.replaceAll(
          searchword, 
          '<span class="searchword">'+searchword+'</span>');
  }

})()