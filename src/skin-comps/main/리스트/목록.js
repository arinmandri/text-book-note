
(function(){
  //// 화면별 기본 보기형식
{% for page, value in settings.liststyle.default.items() %}
  var a = document.querySelector('#tt-body-{{ page }} #postList')
  if( a != null ) a.className = '{{ value }}'
{% endfor %}

  //// 썸네일 없으면 대체이미지
  const noThumbnail = "[##_var_noThumbnail_##]" || "https://t1.daumcdn.net/tistory_admin/static/manage/images/r3/default_L.png";

  const thumbnails = document.querySelectorAll('#postList .thumbnail')
  for( let thumbnail of thumbnails ){
    if( thumbnail.getElementsByTagName('img').length == 0 ){
      thumbnail.classList.add('noThumbnail');
      thumbnail.innerHTML = '<img class="noThumbnail" alt="썸네일 없음" src="' +noThumbnail+ '">';
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