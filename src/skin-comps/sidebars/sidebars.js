
const maxWidthOfMain2 = getTskinOptionNumVal( '[##_var_maxWidthOfMain2_##]', 1000, 1500 );
document.getElementById('main2').style.maxWidth = maxWidthOfMain2 + 'px';

const minWidthToOpenSidebar1 = getTskinOptionNumVal( '[##_var_minWidthToOpenSidebar1_##]', 1000, 1800 );
const minWidthToOpenSidebar2 = getTskinOptionNumVal( '[##_var_minWidthToOpenSidebar2_##]', 1000, 1500 );
const sidebarboxVOccupyingWidth = 305;

const sidebarBox1     = document.getElementById('sidebarBox1');
const sidebarBox2     = document.getElementById('sidebarBox2');
const sidebar2        = document.getElementById('sidebar2');
const sidebar2Remocon = document.getElementById('sidebar2Remocon');

//// 사이드바1: 펼접버튼 클릭시 펴고접음
document.querySelectorAll('.sidebarBtn').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.parentElement.classList.toggle('open');
  });
});
//// 사이드바1: 마우스가 떠나도 접음
sidebarBox1.addEventListener('mouseleave', ( e ) => {
    e.target.classList.remove('open');
});

//// 사이드바2: 리모콘에 버튼 모으기
(function(){
  const sidebarItems_fromSidebar2 = sidebar2.getElementsByClassName('sidebar_element');
  //// 사이드바2 접힘상태
  for( let sidebarItem of sidebarItems_fromSidebar2 ){
    const bubbleBtns = sidebarItem.getElementsByClassName('bubbleBtn');
    if( bubbleBtns.length === 0 )
      continue;
    if( bubbleBtns.length > 1 ){
      console.error('sidebar_element 안 bubbleBtns이가 여럿임.', sidebarItem);
      continue;
    }
    const bubbleBtn = bubbleBtns[0];
    bubbleBtn.addEventListener('click', ()=>{
      const prevOpens = sidebar2.querySelectorAll('.sidebar_element.open');
      prevOpens.forEach((item)=>{
        item.classList.remove('open');
      });
      sidebar2.classList.add('open');
      sidebarItem.classList.add('open');
    });
    sidebar2Remocon.appendChild( bubbleBtn );
  }
  sidebar2Remocon.appendChild( document.getElementById('sidebar2X') );
})();

//// 사이드바2: 접기 버튼
document.getElementById('sidebar2X').addEventListener('click', () => {
    sidebar2.classList.remove('open');
});

document.addEventListener('DOMContentLoaded', function(){
  //// figure 순서 표시
  const captions = document.querySelectorAll('.sidebar .caption')
  for( let i=0; i<captions.length; i++ ){
    captions[i].innerHTML 
      = '<span class="semo">▴</span> figure '
      + (i+1)+': '
      + captions[i].innerText;
  }

  refreshSidebarVStatus();
});

//// 사이드바1, 사이드바2 펼접
let sidebar1_status;
let sidebar2_status;
let main2_status;

//// 사이드바 펼접 상태
//// 사이드바1 펴나, 사이드바2 펴나, 메인2 마진 중앙정렬 하나
function getSidebarVStatus(){
  const vw = document.documentElement.clientWidth;
  return [
    ( vw >= minWidthToOpenSidebar1 ) ? true : false,
    ( vw >= minWidthToOpenSidebar2 ) ? true : false,
    ( vw >= maxWidthOfMain2 + 2*sidebarboxVOccupyingWidth ) ? true : false,
  ];
}


//// 화면 크기 조절
window.addEventListener('resize', refreshSidebarVStatus);

function refreshSidebarVStatus(){

  const [s1_status_new, s2_status_new, m2_status_new] = getSidebarVStatus();

  if( sidebar1_status !== s1_status_new ){// 사이드바1 펼접상태 바뀜
    sidebar1_status = s1_status_new;
    if( s1_status_new === true ){// 사이드바1 펴기
      sidebarBox1.classList.remove('fold');
      sidebarBox1.classList.remove('open');
      sidebarBox1.classList.add('flat');
      main2.style.marginLeft = sidebarboxVOccupyingWidth + 'px';
    }else{
      sidebarBox1.classList.remove('flat');
      sidebarBox1.classList.add('fold');
      main2.style.marginLeft = '';
    }
  }
  if( sidebar2_status !== s2_status_new ){// 사이드바2 펼접상태 바뀜
    sidebar2_status = s2_status_new;
    if( s2_status_new === true ){// 사이드바2 펴기
      sidebarBox2.classList.remove('fold');
      sidebarBox2.classList.remove('open');
      sidebarBox2.classList.add('flat');
      sidebarBox2.classList.add('sidebarBoxV');
      sidebar2.classList.add('sidebarV');
      main2.style.marginRight = sidebarboxVOccupyingWidth + 'px';
    }else{
      sidebarBox2.classList.remove('flat');
      sidebarBox2.classList.add('fold');
      sidebarBox2.classList.remove('sidebarBoxV');
      sidebar2.classList.remove('sidebarV');
      main2.style.marginRight = '';
    }
  }
  if( main2_status !== m2_status_new ){// 메인 여백(중앙정렬용)
    main2_status = m2_status_new;
    if( m2_status_new === true ){
        main2.style.marginLeft = '';
        main2.style.marginRight = '';
    }else{
        main2.style.marginLeft  = s1_status_new ? sidebarboxVOccupyingWidth + 'px' : '';
        main2.style.marginRight = s2_status_new ? sidebarboxVOccupyingWidth + 'px' : '';
    }
  }
}
