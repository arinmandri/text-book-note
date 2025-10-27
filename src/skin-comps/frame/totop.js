// 스크롤 아래로: 맨위로버튼 숨김
// 스크롤 위로: 맨위로버튼 표시
// totopBox의 height를 조절하여 구현.
document.addEventListener('DOMContentLoaded', function () {
  const totopBox = document.getElementById('totopBox');
  if( totopBox == null ) return;

  let lastY = window.scrollY || 0;
  window.addEventListener('scroll', function () {
    const y = window.scrollY || 0;

    if      ( y < lastY ) totopBox.style.height = '40px';
    else if ( y > lastY ) totopBox.style.height = '0px';

    lastY = y;
  }, { passive: true });
});
