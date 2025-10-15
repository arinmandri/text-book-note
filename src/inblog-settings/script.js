
let noThumbnail = "[##_var_noThumbnail_##]";
if( noThumbnail === "" )
  noThumbnail = "./images/noThumbnail-default.svg";

const maxWidthOfMain2        = getOptionValue( '[##_var_maxWidthOfMain2_##]',        1000, 1500 );
const minWidthToOpenSidebar1 = getOptionValue( '[##_var_minWidthToOpenSidebar1_##]', 1000, 1800 );
const minWidthToOpenSidebar2 = getOptionValue( '[##_var_minWidthToOpenSidebar2_##]', 1000, 1500 );

function getOptionValue( optionValueString, minVal, defaultVal ) {
  try{
    if( optionValueString === '' ) return defaultVal;
    if( optionValueString == null ) return defaultVal;
    let val = Number( optionValueString );
    if( val < minVal ) return defaultVal;
    return val;
  }catch (e){
    console.error('옵션 값 '+optionValueString+'을를 수로 변환  실패');
    return defaultVal;
  }
}










(function(){
  //// 설정값
  /*
   * settingForm
   * ├ input.settingCore 설정값 
   * │    태그 속성에 이 설정의 동작 지정.
   * │    name 설정 이름.
   * │    value 설정의 값.
   * │    onchange 설정의 효과.(각자 정의)
   * │    oninvalid 저장된 설정 없을시의 동작.(기본값으로 적용 등)
   * ├ .settingAction.toggle 논리값꼴 설정값. 클릭시 설정값 토글
   * ├ .settingAction.clickValue 설정값. 선택시 settingCore의 value로 적용
   * ├ (다른 타입의 설정은 onclick 직접 정의)
   * └ input[type="checkbox"].fixCbox 고정 체크박스설정값 있으면 자동으로 체크된다. 고정시 값 저장. 고정 해제시 저장된 값 삭제.
   * 　    oninvalid 체크 해제시의 동작.
   */
  document.addEventListener('DOMContentLoaded', function(){
    //// 모든 설정요소 가져오기
    const settingForms = document.getElementsByClassName('settingForm');
    for( let settingForm of settingForms ){

      const settingCore = settingForm.querySelector('.settingCore');
      if( settingCore == null ){
        console.error('settingForm에 name용 태그 없음', settingForm);
        continue;
      }

      //// 설정값 이름
      const settingName = settingCore.name;
      if( settingName == null || settingName == '' ){
        console.error('settingFormCore에 name 속성 없음', settingFormCore);
        continue;
      }
      settingCore.id = 'settingCore-' + settingName;

      //// 고정 체크 요소
      const fixCbox      = settingForm.querySelector('.fixCbox');
      const fixCboxLabel = settingForm.querySelector('.fixCboxLabel');
      if( fixCbox != null ){
        fixCbox.id = 'fixCbox-' + settingName;
        if( fixCboxLabel != null ){
          fixCboxLabel.setAttribute( 'for', fixCbox.id );
        }
      }
      fixCbox.addEventListener('change', ()=>{
        if( checkSettingFixCbox( settingName ) ){
          localStorage.setItem( settingName, settingCore.value );
        }else{
          localStorage.removeItem( settingName );
          fixCbox.dispatchEvent( new Event('invalid') );
        }
      });

      //// 설정값 불러오기
      const saved = localStorage.getItem( settingName );
      if( saved != null ){// 설정값 있음
        //// 고정 체크
        if( fixCbox != null ){
          fixCbox.checked = true;
        }
        //// 설정값 적용
        setSettingCore( settingCore, saved );
      }else{// 설정값 없음: 기본동작
        settingCore.dispatchEvent( new Event('invalid') );
      }

      //// 토글버튼
      const toggleBtns = settingForm.querySelectorAll('.settingAction.toggle');
      for( let toggleBtn of toggleBtns ){
        toggleBtn.addEventListener('click', ()=>{
          if( settingCore.value === 'true' ){
            setSettingValue0( settingCore, 'false', fixCbox );
          }else{
            setSettingValue0( settingCore, 'true', fixCbox );
          }
        });
      }

      //// 클릭하여 값 선택 버튼
      const clickValueBtns = settingForm.querySelectorAll('.settingAction.clickValue');
      for( let clickValueBtn of clickValueBtns ){
        clickValueBtn.addEventListener('click', ()=>{
          setSettingValue0( settingCore, clickValueBtn.value, fixCbox );
        });
      }
    }
  });
})();

function setSettingValue( settingName , value ) {
  const settingCore = document.getElementById( 'settingCore-' + settingName );
  const fixCbox     = document.getElementById( 'fixCbox-'     + settingName );
  setSettingValue0( settingCore, value, fixCbox );
}
function setSettingValue0( settingCore , value , fixCbox ) {
  setSettingCore( settingCore, value );
  if( fixCbox != null && fixCbox.checked ){
    localStorage.setItem( settingCore.name, value );
  }
}

function setSettingCore( settingCore , value ) {
  settingCore.value = value;
  settingCore.dispatchEvent( new Event('change') );
}

//// 설정값 가져오기
function getSettingValue( settingName ){
    return document.getElementById( 'settingCore-' + settingName ).value;
}
//// 설정 고정 체크 여부 확인
function checkSettingFixCbox( settingName ){
    return document.getElementById( 'fixCbox-' + settingName ).checked;
}
//// 설정 고정 체크
function setSettingFixCbox( settingName, checked ){
  const fixCbox = document.getElementById( 'fixCbox-' + settingName )
  fixCbox.checked = checked;
  fixCbox.dispatchEvent(new Event('change'));
}
