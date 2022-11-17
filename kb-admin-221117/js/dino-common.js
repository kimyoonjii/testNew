// DinoWorks Common Script 2022-08-06
window.addEventListener('load', function() {
  // console.log('load');
  preventLinkDefault();
  findCurrentMenu();
  setGNB();

}, false);


function preventLinkDefault() {
  document.addEventListener('click', function(e) {
    let lastNode = e.currentTarget;
    let currentNode = e.target;
    while (currentNode !== lastNode) {
      // console.log(currentNode);
      if (currentNode.matches('a[href="#"]') === true) {
        // # 링크 버튼인 경우
        // console.log('prevent');
        e.preventDefault();
        break;
      } else if (currentNode.matches('a[href^="#"]') === true) {
        // #main 등 hash 처리 (미처리시 base 속성으로 root로 이동)
        e.preventDefault();
        let hash = currentNode.getAttribute('href').replace('#', '');
        location.hash = hash;
        break;
      }
      currentNode = currentNode.parentNode;
    }
  }, false);
}


function findCurrentMenu() {
  let bodyClass = document.querySelector('body').getAttribute('class');
  let classArray = [];

  if (bodyClass === undefined || bodyClass === 'main') return false;

  classArray = bodyClass.split(' ');

  document.querySelectorAll('#gnb nav > h3').forEach(function(el) {
    if (el.getAttribute('data-menu') === classArray[1]) {
      el.classList.add('on');
    } else {
      el.classList.remove('on');
    }
  });

  document.querySelectorAll('#gnb nav > h3.on + ul > li').forEach(function(el) {
    if (el.getAttribute('data-menu') === classArray[2]) {
      el.classList.add('on');
    } else {
      el.classList.remove('on');
    }
  });

  document.querySelectorAll('#gnb nav > ul > li.on > ul > li').forEach(function(el) {
    if (el.getAttribute('data-menu') === classArray[3]) {
      el.classList.add('on');
    } else {
      el.classList.remove('on');
    }
  });
}


function setGNB() {
  // 서브메뉴 표시
  const menus = document.querySelectorAll('#gnb nav > ul > li > a');
  menus.forEach(function(el) {
    if (el.parentElement.querySelectorAll('ul').length > 0) {
      el.insertAdjacentHTML('beforeend', '<i class="fa-solid fa-angle-right"><span>서브메뉴있음</span></i>');
    }

    el.addEventListener('click', function() {
      el.parentElement.classList.toggle('on');
    }, false);
  });
}






