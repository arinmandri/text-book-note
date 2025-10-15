
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
const param = getParameters();

//{% include "inblog-settings/darkmode-html.js" %}

//{% include "extentions/checkDeletePost/script.js" %}