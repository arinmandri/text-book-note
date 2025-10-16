
/**
 * @param list 생성된 목차를 넣을 HTML 요소.
 * @param bonmun 이 HTML 요소 안의 h2,h3,h4 요소들로 목차 생성.
 */
( bonmun , list )=>{
  const hs = bonmun.querySelectorAll('.pmargin > h2, .pmargin > h3, .pmargin > h4');// 대상 소제목 요소들 선택
  let level = 0;
  let h2 = 0;
  let h3 = 0;
  let h4 = 0;
  let htext;
  let hclass;
  let tempstr = '';
  for( let i=0; i<hs.length; i+=1 ){
    if( hs[i].nodeName == 'H2' ){
      level = 2;
      h2 += 1;// 자기 번호 카운트
      h3 = 0;// 하위 문단 번호 초기화
      h4 = 0;// 하위 문단 번호 초기화
      hn = h2;// 번호
      hclass = 'h2';
    }
    if( hs[i].nodeName == 'H3' ){
      level = 3;
      h3 += 1;// 자기 번호 카운트
      h4 = 0;// 하위 문단 번호 초기화
      hn = h2+'-'+h3;// 번호
      hclass = 'h3';
    }
    if( hs[i].nodeName == 'H4' ){
      level = 4;
      h4 += 1;// 자기 번호 카운트
      hn = h2+'-'+h3+'-'+h4;// 번호
      hclass = 'h4';
    }
    htext = hs[i].innerText;
    //// 소제목에 번호 붙이기
    if( '[##_var_bonmunHeadingNumbering_##]' == true ){
      hs[i].innerHTML 
        = '<span class="hn" id="hn-'+hn+'">'+hn+'. </span>'
        + hs[i].innerHTML;
      //// 목차 모듈에 항목 생성 (번호 있음)
      tempstr += 
        '<li class="line-out '+hclass+'">'
        +'<a class="line-in" href="#hn-'+hn+'">'
        +   '<span class="num">'+hn+'</span>. '+htext
        +'</a></li>';
    }
    else{
      //// 목차 모듈에 항목 생성 (번호 없음)
      tempstr += 
        '<li class="line-out '+hclass+'">'
        +'<a class="line-in" href="#hn-'+hn+'">'
        +   '<span class="numBlank numBlank'+level+'"></span>'+htext
        +'</a></li>';
    }
  }
  //// 다 돌았는데도 나온 소제목이 하나도 없으면 없다고 표시
  if( tempstr == '' ){
    list.innerHTML = '<li class="_textCenter">본문에 소제목이 없습니다.</li>'
  }
  else {// 소제목 있음
    list.innerHTML = tempstr;
    window.addEventListener('scroll', function(){// 스크롤 이벤트
      let currentH = 0;// 스크롤 위치 상; 현재 보고있는 목차 항목
      for( let i=0; i < hs.length; i+=1 ){// 초기화
        list.childNodes[i].classList.remove('current');
      }
      for( let i=hs.length-1; i >= 0 ; i-=1 ){
        if( hs[i].getBoundingClientRect().y < (window.outerHeight)/3 ){// 소제목의 y위치가 어느정도보다 높으면
          list.childNodes[i].classList.add('current');
          break;
        }
      }
    });
  }
}