
function checkDeletePost() {
  if ('[##_var_checkDeletePost_##]' == true) {
    const checkCode = Math.floor(Math.random() * 90) + 10 + '';
    let checkInput = prompt('정말 삭제하시려면 다음 숫자를 정확히 입력하세요: ' + checkCode);
    return checkCode === checkInput;
  } else {
    return true;
  }
}