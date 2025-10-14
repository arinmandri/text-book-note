
      function checkDeletePost(){
        if( '[##_var_checkDeletePost_##]' == true ){
          const checkCode = Math.floor(Math.random() * 90) + 10 + '';
          let checkInput = prompt('정말 삭제하시려면 다음 숫자를 정확히 입력하세요: ' + checkCode);
          return checkCode === checkInput;
        }else{
          return true;
        }
      }
    (function(){
      const bonmuns = document.querySelectorAll('.bonmun .contents_style');
      for( let bonmun of bonmuns ){
        bonmun.classList.add('pmargin');
      }

      //// 숨김상자미리보기, 숨은상자 클릭하면 부모인 숨김상자가 열렸다 닫혔다 한다
      const hidingBoxes = document.querySelectorAll('.hidingBox');
      for( let hidingBox of hidingBoxes ){
        //// 미리보기 요소의 클릭이벤트 (숨은내용 펴기)
        hidingBox.querySelector('.hidingPreview').setAttribute('onclick', 'this.parentNode.classList.toggle("open")')
        //// 다시 숨기기 버튼 만들기
        const btn1 = document.createElement('button')
        const btn2 = document.createElement('button')
        btn1.className = 'hidingPostview'
        btn2.className = 'hidingPostview'
        btn1.innerHTML = '⁋┏접기'
        btn2.innerHTML = '접기┛⁋'
        btn1.setAttribute('onclick', 'this.parentNode.parentNode.classList.toggle("open")')
        btn2.setAttribute('onclick', 'this.parentNode.parentNode.classList.toggle("open")')
        //// 버튼1은 첫번째 숨은내용의 첫번째 자식,
        //// 버튼2는 마지막 숨은내용의 마지막 자식으로 추가
        const hiddenBoxes = hidingBox.querySelectorAll('.hiddenBox')
        hiddenBoxes[0                   ].prepend(btn1)
        hiddenBoxes[hiddenBoxes.length-1].append(btn2)
      }

      //// 숨김글귀 클릭시 고정
      const hidingPhrases = document.getElementsByClassName('hidingPhrase');
      for( let hidingPhrase of hidingPhrases ){
        hidingPhrase.addEventListener('click', function(){
          this.classList.add('fixed');
        })
      }

      //// 비어있는 a태그의 내부 텍스트 #
      const as = document.querySelectorAll('.bonmun a')
      for( let a of as ){
        if( a.innerText == '' )
          a.innerHTML = '#'
      }
      //// 외부 링크(블로그 밖의 페이지)로 이동하는 a는 새 페이지에
      for( let a of as ){
        const hostname = new URL( a.href ).hostname;
        if( hostname !== thisHostname )// 이 블로그 안의 주소가 아니면
          a.target = '_blank'// 새 페이지에서 열기
      }

      //// ol의 리스트 스타일 만들기 (버튼 태그인 이유는 그 망할 텍스트 세로가운데정렬 하려고)
      const ols = document.querySelectorAll('.bonmun ol')
      for( let ol of ols ){
        const ollis = ol.children;
        const start = ol.start;// ol 태그의 원래 start 기능 따라하기
        let i=0;
        for( let olli of ollis ){
          // <button class="olliMarker"> (i+1) </button>
          const temp = document.createElement('button')
          temp.innerText = i + start
          temp.className = 'olliMarker'
          olli.prepend(temp);
          i+=1;
      } }
    })()