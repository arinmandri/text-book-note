// 요소 복사
// 페이지 로딩 완료 후
// copy-origin 의 내용을 copy-target 로 복사.
// data-copyname 으로 복사항목끼리 구별.
// 예시
// <div class="copy-origin" data-copyname="name123">복사할 내용</div>
// <div class="copy-target" data-copyname="name123"></div>
// 복사원본은 하나만(원본끼리 서로다른이름). 복사대상은 같은 이름으로 여러 개 있어도 된다. 모두 복사.
document.addEventListener('DOMContentLoaded', function(){
  const origins = document.getElementsByClassName('copy-origin')
  const targets = document.getElementsByClassName('copy-target')
  for( let origin of origins ){
    const name = origin.dataset.copyname;
    for( let target of targets ){
      const tname = target.dataset.copyname;
      if( tname === name ){
        target.innerHTML = origin.innerHTML;
      }
    }
  }
  // XXX 원본이 없으면 대상 요소도 삭제해야 하나?
});