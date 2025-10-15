//// 다크모드 - body
(function(){
  const isDark = document.getElementsByTagName('html')[0].dataset.theme === 'dark';
  if( isDark ){
    document.body.classList.add('theme-dark');
    document.body.classList.remove('theme-light');
  }else{
    document.body.classList.add('theme-light');
    document.body.classList.remove('theme-dark');
  }
})();