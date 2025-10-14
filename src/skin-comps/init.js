
const thisHostname = new URL(window.location.href).hostname;

const gt0 = Date.now();

//// url의 파라미터 가져오기
function getParameters() {
  let param = new Array();// 파라미터가 담길 배열
  const url = decodeURIComponent(decodeURIComponent(location.href));// url이 encodeURIComponent 로 인코딩 되었을때는 다시 디코딩 해준다.
  const params = url.substring(url.indexOf('?') + 1, url.length).split('&');// url에서 '?' 이후의 문자열까지 자르고 '&'로 분리
  //// params 배열을 '='로 쪼개 param 배열에 key=value 로 담기
  let key, value;
  for (let i = 0; i < params.length; i++) {
    let temp = params[i].split('=')
    key = temp[0];
    value = temp[1];
    param[key] = value;
  }
  return param;
}
const param = getParameters()

//// 다크모드 - html
(function(){
  let isDark = false;
  const saved = localStorage.getItem('darkmode');
  if( saved != null ){
    isDark = saved === 'true' ? true : false;
  }else{
    const hour = new Date().getHours();
    if( hour >= 18 || hour < 6 )
      isDark = true;
  }
  if( isDark ){
    document.documentElement.setAttribute('data-theme', 'dark');
  }else{
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();