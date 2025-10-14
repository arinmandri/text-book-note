
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

    onWindowResize();
  });

  //// 사이드바1, 사이드바2 펼접
  let resizeTimer;
  window.addEventListener('resize', onWindowResize);

  //// 화면 크기 조절
  function onWindowResize(){
    clearTimeout( resizeTimer );
    resizeTimer = setTimeout(()=>{
      const vw = document.documentElement.clientWidth;

      const sidebarboxVOccupyingWidth = 305;
      if( vw >= minWidthToOpenSidebar1 ){// 사이드바1 펴기
        sidebarBox1.classList.remove('fold');
        sidebarBox1.classList.remove('open');
        sidebarBox1.classList.add('flat');
        main2.style.marginLeft = sidebarboxVOccupyingWidth + 'px';
      }else{
        sidebarBox1.classList.remove('flat');
        sidebarBox1.classList.add('fold');
        main2.style.marginLeft = '';
      }
      if( vw >= minWidthToOpenSidebar2 ){// 사이드바2 펴기
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
      if( vw >= maxWidthOfMain2 + 2*sidebarboxVOccupyingWidth ){
        main2.style.marginLeft = '';
        main2.style.marginRight = '';
      }
    }, 70);
  }

  //// 광고차단 확인
  function isAdBlocking(){
    let ad = document.getElementsByClassName('revenue_unit_wrap')[0];
    if( getComputedStyle(ad).display === 'none' )
      return true;
    return false;
  }