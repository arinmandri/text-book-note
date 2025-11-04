
/*
사이드바1, 사이드바2 의 상태
- 접힘 .fold
- 펼침 .fold.open
- 열림 .flat
*/

const maxWidthOfmainH = getTskinOptionNumVal( '[##_var_maxWidthOfmainH_##]', 1000, 1500 );
document.getElementById('mainH').style.maxWidth = maxWidthOfmainH + 'px';

const minWidthToOpenSidebar1 = ( document.getElementById('tt-body-index') == null// 홈화면에서만 넓은화면에서도 안 펴기
    || '[##_var_home_sidebar1_##]' === 'usual' )
  ? getTskinOptionNumVal( '[##_var_minWidthToOpenSidebar1_##]', 1000, 9999 )
  : 9999;
const minWidthToOpenSidebar2 = ( document.getElementById('tt-body-index') == null
  || '[##_var_home_sidebar2_##]' === 'usual' )
  ?getTskinOptionNumVal( '[##_var_minWidthToOpenSidebar2_##]', 1000, 9999 )
  : 9999;
const sidebarboxVOccupyingWidth = 305;

const sidebarBox1     = document.getElementById('sidebarBox1');
const sidebarBox2     = document.getElementById('sidebarBox2');
const sidebar2        = document.getElementById('sidebar2');
const sidebar2Remocon = document.getElementById('sidebar2Remocon');

function sidebarBox2Close(){
  sidebar2.querySelectorAll('.open').forEach((item)=>{
    item.classList.remove('open');
  });
  sidebarBox2.classList.remove('open');
}
sidebarBox2.afterClose = sidebarBox2Close;

//// 사이드바2: 리모콘에 버튼 모으기
(function(){
  const sidebarItems_fromSidebar2 = sidebar2.children;
  const imgBanners = [];
  //// 사이드바2 접힘상태
  for( let sidebarItem of sidebarItems_fromSidebar2 ){

    if( sidebarItem.classList.contains('module_plugin') ){// 티스토리 플러그인 - 이미지 배너
      imgBanners.push( sidebarItem );
      continue;
    }

    const bubbleBtns = sidebarItem.getElementsByClassName('bubbleBtn');
    if( bubbleBtns.length === 0 )
      continue;
    if( bubbleBtns.length > 1 ){
      console.error('sidebar_element 안 bubbleBtns이가 여럿임.', sidebarItem);
      continue;
    }
    const bubbleBtn = bubbleBtns[0];
    bubbleBtn.addEventListener('click', ()=>{
      const currentlyOpen = sidebarItem.classList.contains('open');
      sidebarBox2Close();
      if( !currentlyOpen ){
        sidebarItem.classList.add('open');
        sidebarBox2.classList.add('open');
      }
    });
    sidebar2Remocon.appendChild( bubbleBtn );
  }

  if( imgBanners.length > 0 ){
    const bubbleBtn = document.createElement('button');
    bubbleBtn.classList.add('bubbleBtn', 'themeBtn');
    bubbleBtn.textContent = '배너';
    bubbleBtn.addEventListener('click', () => {
      sidebarBox2Close();
      sidebarBox2.classList.add('open');
      for( let sidebarItem of imgBanners ){
        sidebarItem.classList.add('open');
      }
    });
    sidebar2Remocon.appendChild( bubbleBtn );
  }
})();

document.addEventListener('DOMContentLoaded', function(){
  //// figure 순서 표시
  const captions = document.querySelectorAll('.sidebar .caption')
  for( let i=0; i<captions.length; i++ ){
    captions[i].innerHTML 
      = '<span class="semo">▴</span> figure '
      + (i+1)+': '
      + captions[i].innerText;
  }
});

//// 사이드바1, 사이드바2 펼접
let sidebar1_status;
let sidebar2_status;

//// 사이드바 펼접 상태
//// 사이드바1 펴나, 사이드바2 펴나, 메인2 마진 중앙정렬 하나
function getSidebarVStatus(){
  const vw = document.documentElement.clientWidth;
  return [
    ( vw >= minWidthToOpenSidebar1 ) ? true : false,
    ( vw >= minWidthToOpenSidebar2 ) ? true : false,
  ];
}


//// 화면 크기 조절
refreshSidebarVStatus();
window.addEventListener('resize', refreshSidebarVStatus);

function refreshSidebarVStatus(){

  const [s1_status_new, s2_status_new] = getSidebarVStatus();

  if( sidebar1_status !== s1_status_new ){// 사이드바1 펼접상태 바뀜
    sidebar1_status = s1_status_new;
    if( s1_status_new === true ){// 사이드바1 펴기
      sidebarBox1.classList.remove('fold');
      sidebarBox1.classList.remove('open');
      sidebarBox1.classList.add('flat');
      mainHBox.style.marginLeft = sidebarboxVOccupyingWidth + 'px';
    }else{
      sidebarBox1.classList.remove('flat');
      sidebarBox1.classList.add('fold');
      mainHBox.style.marginLeft = '0';
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
      mainHBox.style.marginRight = sidebarboxVOccupyingWidth + 'px';
    }else{
      sidebarBox2.classList.remove('flat');
      sidebarBox2.classList.add('fold');
      sidebarBox2.classList.remove('sidebarBoxV');
      sidebar2.classList.remove('sidebarV');
      mainHBox.style.marginRight = '0';
    }
  }
}
