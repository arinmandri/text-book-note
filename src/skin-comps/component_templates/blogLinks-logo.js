// 블로그 링크(a 태그) 앞부분에 대응 이미지 태그 덧붙임.
(function () {
  const as = document.querySelectorAll('.blogLinks a');
  for (let a of as) {
    let logoName;
    //// url의 hostname으로 대응되는 로고 찾기
    try {
      const hostname = new URL(a.href).hostname;
      if (a.href.endsWith('/rss')) logoName = 'rss';
      else if (hostname === 'youtu.be') logoName = 'youtube';
      else if (hostname === 'youtube.com') logoName = 'youtube';
      else if (hostname.endsWith('.youtube.com')) logoName = 'youtube';
      else if (hostname === 'drive.google.com') logoName = 'gdrive';
      else if (hostname === 'instagram.com') logoName = 'instagram';
      else if (hostname.endsWith('.instagram.com')) logoName = 'instagram';
      else if (hostname === 'x.com') logoName = 'x';
      else if (hostname.endsWith('.x.com')) logoName = 'x';
      else if (hostname === 'twitter.com') logoName = 'x';
      else if (hostname.endsWith('.twitter.com')) logoName = 'x';
      else if (hostname === 'twitch.tv') logoName = 'twitch';
      else if (hostname.endsWith('.twitch.tv')) logoName = 'twitch';
      else if (hostname === 'tistory.com') logoName = 'tistory';
      else if (hostname.endsWith('.tistory.com')) logoName = 'tistory';
      else if (hostname === 'blog.naver.com') logoName = 'naverblog';
      else if (hostname === 'cafe.naver.com') logoName = 'navercafe';
      else if (hostname === 'github.com') logoName = 'github';
      else if (hostname.endsWith('.github.com')) logoName = 'github';
    } catch (e) {
      return false; // 유효하지 않은 URL인 경우
    }
    if (logoName != null) {
      const img = document.createElement('img');
      img.alt = logoName + '의 로고';
      img.src = './images/link-' + logoName + '.png';
      a.prepend(img);
    } else {// 로고 없음: 기본이미지 이모지
      a.prepend(String.fromCodePoint(0x1F517));
    }
  }
})();