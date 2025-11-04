//// close-onclick-outside: 자신의 바깥을 클릭시 닫음
//// open 클래스 제거.
//// afterClose 동작 있으면 실행.
document.addEventListener('click', (e) => {
  const clicked = e.target;
  document.querySelectorAll('.close-onclick-outside.open').forEach(el => {
    if( !el.contains(clicked) ){
      el.classList.remove('open');
      if( el.afterClose != null ){
        el.afterClose();
      }
    }
  });
});