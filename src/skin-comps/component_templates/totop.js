// 스크롤 아래로: 맨위로버튼 숨김
// 스크롤 위로: 맨위로버튼 표시
// totopBox의 height를 조절하여 구현.
document.addEventListener('DOMContentLoaded', function () {
  const totopBox = document.getElementById('totopBox');
  const sidebarBtnBox1 = document.getElementById('sidebarBtnBox1');

  let lastY = window.scrollY || 0;
  window.addEventListener('scroll', function () {
    const y = window.scrollY || 0;

    if      ( y < lastY ) {
      totopBox.style.height = ( y > window.innerHeight/2 ) ? '40px' : '0px';
      sidebarBtnBox1.classList.remove('hideByScrolling');
    }
    else if ( y > lastY ) {
      totopBox.style.height = '0px';
      sidebarBtnBox1.classList.add('hideByScrolling');
    }

    lastY = y;
  }, { passive: true });
});
