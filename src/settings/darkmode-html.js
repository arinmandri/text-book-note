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