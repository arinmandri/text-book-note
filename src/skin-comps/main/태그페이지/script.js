
(function(){
  //// 태그 개수
  document.getElementById('tagCount').innerText = 
    '인기 태그 '
    +(document.getElementById('tagBox').querySelectorAll('.tagcloud1,.tagcloud2,.tagcloud3').length)
    +'개';
})();

document.addEventListener('DOMContentLoaded', function(){
  //// 한글 초성
  const Chosong = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];

  //// 태그를 초성별로 모음
  //// 태그: HTML 태그를 가리키는 말이 아니라 블로그 게시글의 태그
  const grouped = getGroupedElements(
    Array.from(document.getElementById('tagBox').children)// tagBox의 자식 요소를 배열로 수집
  );

  //// 결과 구성: 키 가나다순으로 버킷에서 HTML 요소 만들어 추가
  const tagBoxOrdered = document.getElementById('main4');// 생성된 요소들이 들어갈 곳
  const sortedKeys = Object.keys(grouped).sort((a, b) => {
    return a.localeCompare(b, 'ko-KR');
  });
  sortedKeys.forEach(key => {
    tagBoxOrdered.appendChild( createBucketElement(key) );
  });

  /**
   * 태그 요소들을 초성별로 모음
   * 
   * @param items 태그 요소들
   */
  function getGroupedElements( items ){
    const grouped = {};// 초성으로 분류

    items.forEach(el => {// 항목 분류
      const text = el.textContent.trim();
      if( text.length === 0) return;

      const key = getTextInitial(text[0]);// 분류기준: 초성
      if( !grouped[key] )
        grouped[key] = [];

      grouped[key].push( el.cloneNode(true) );// 노드 복사본 저장
    });

    return grouped;
  }

  /**
   * 버킷으로부터 HTML 요소 생성
   * 
   * @param key 버킷 키 즉 초성
   */
  function createBucketElement( key ){

    const bucket = document.createElement('div');
    bucket.className = 'bucket';

    const bucketName = document.createElement('h4');
    bucket.appendChild(bucketName);
    bucketName.className = 'bucketName';
    bucketName.innerText = key;
    bucketName.id = 'tag-initial--' + key;

    const list = document.createElement('ul');
    bucket.appendChild(list);
    list.className = 'list';

    grouped[key].sort(
      (a, b) => a.innerText.localeCompare(b.innerText, 'ko-KR'))
      .forEach(clone => list.appendChild(clone));

    return bucket;
  }

  //// 초성 추출
  function getTextInitial( char ) {
    const code = char.charCodeAt(0);
    // 한글 음절: 가 ~ 힣 (U+AC00 ~ U+D7A3)
    if( code >= 0xAC00 && code <= 0xD7A3 ){
      const index = Math.floor((code - 0xAC00) / 588);
      return Chosong[index];
    }

    // 영문자: 대문자로 변환 후 첫 글자 반환
    if( /[a-zA-Z]/.test(char) ){
      return char.toUpperCase();
    }

    // 숫자나 기타 문자
    return '#';
  }
})();