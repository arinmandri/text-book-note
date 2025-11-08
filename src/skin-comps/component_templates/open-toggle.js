//// open 토글버튼
//// <button class="open-toggleBtn" data-opentarget="대상요소id">OPEN</button>
//// 대상 요소의 class 중 open을 넣거나 뺀다.
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.open-toggleBtn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.getElementById( btn.dataset.opentarget );
      target.classList.toggle('open');
    });
  });
});