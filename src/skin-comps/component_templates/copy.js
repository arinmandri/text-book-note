// 요소 복사
// 페이지 로딩 완료 후
// copy-origin 의 내용을 copy-target 로 복사.
// data-copyname 으로 복사항목끼리 구별.
// 예시
// <div class="copy-origin" data-copyname="name123">복사할 내용</div>
// <div class="copy-target" data-copyname="name123"></div>
// 복사원본은 하나만(원본끼리 서로다른이름). 복사대상은 같은 이름으로 여러 개 있어도 된다. 모두 복사.
document.addEventListener('DOMContentLoaded', function () {

  const map1 = new Map();

  //// 대상 copyname별로 맵에 넣기
  const targets = document.getElementsByClassName('copy-target');
  for( let target of targets ){
    const name = target.dataset.copyname;

    let curr = map1.get( name );
    if( curr == null ){
      curr = [ target ];
      map1.set( name, curr );
    }else{
      curr.push( target );
    }
  }

  //// 원본 copyname별로 맵에서 대상 꺼내서 내용 복사.
  const origins = document.getElementsByClassName('copy-origin');
  for( let origin of origins ){
    const name = origin.dataset.copyname;
    const targetArr = map1.get( name );
    if( targetArr === undefined ) continue;

    for( let target of targetArr ){
      target.innerHTML = origin.innerHTML;
    }
    map1.delete( name );
  }

  //// 원본이 없는 대상들 삭제.
  for( let targetArr of map1.values() ){
    for( let target of targetArr ){
      target.remove();
    }
  }
});