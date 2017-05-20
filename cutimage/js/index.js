window.onload = function () {
  // 禁止图片选中，避免选中图片造成一闪一闪的体验，两种写法一样的
  // if(document.all){ // method 1
  //   document.onselectstart= function(){return false;}; //for ie
  // }else{
  //   document.onmousedown= function(){return false;};
  //   document.onmouseup= function(){return true;};
  // }
  document.onselectstart = new Function('event.returnValue=false') // method 2

  var rightDiv = document.getElementById('right');
  var topDiv = document.getElementById('top');
  var leftDiv = document.getElementById('left');
  var botDiv = document.getElementById('bot');
  var leftTopDiv = document.getElementById('left-top');
  var rightTopDiv = document.getElementById('right-top');
  var rightBotDiv = document.getElementById('right-bot');
  var leftBotDiv = document.getElementById('left-bot');
  var mainDiv = document.getElementById('main');
  var boxDiv = document.getElementById('box');
  var img1 = document.getElementById('img1');
  var img2 = document.getElementById('img2');

  var ifKeyDown = false; // 鼠标按下状态
  var contact = ''; // 表示被按下的触点
  var startX,startY; // 表示拖拽开始位置
  var imgW = document.getElementById('img').offsetWidth;
  var imgH = document.getElementById('img').offsetHeight;

  rightDiv.onmousedown = function (e) {
    // 阻止事件冒泡，因为在父元素上边也绑定了onmousedown事件
    e.stopPropagation();
    ifKeyDown = true;
    contact = 'right';
  }
  topDiv.onmousedown = function (e) {
    e.stopPropagation();
    ifKeyDown = true;
    contact = 'top';
  }
  leftDiv.onmousedown = function (e) {
    e.stopPropagation();
    ifKeyDown = true;
    contact = 'left';
  }
  botDiv.onmousedown = function (e) {
    e.stopPropagation();
    ifKeyDown = true;
    contact = 'bot';
  }
  leftTopDiv.onmousedown = function (e) {
    e.stopPropagation();
    ifKeyDown = true;
    contact = 'leftTop';
  }
  rightTopDiv.onmousedown = function (e) {
    e.stopPropagation();
    ifKeyDown = true;
    contact = 'rightTop';
  }
  rightBotDiv.onmousedown = function (e) {
    e.stopPropagation();
    ifKeyDown = true;
    contact = 'rightBot';
  }
  leftBotDiv.onmousedown = function (e) {
    e.stopPropagation();
    ifKeyDown = true;
    contact = 'leftBot';
  }
  mainDiv.onmousedown = function (e) {
    ifKeyDown = true;
    contact = 'drag';
    startX = e.clientX;
    startY = e.clientY;
  }
  // 注意这里的鼠标抬起事件也是绑在window上
  window.onmouseup = function (e) {
    ifKeyDown = false;
    contact = ''
  }
  // 这里注意鼠标移动事件不能加在小点上，因为鼠标离开小点如果是按下的话还要继续保持控件的鼠标事件
  window.onmousemove = function (e) {
    if (ifKeyDown) {
      switch (contact) {
        case 'right': rightMove(e); break;
        case 'top': topMove(e); break;
        case 'left': leftMove(e); break;
        case 'bot': botMove(e); break;
        case 'leftTop': leftMove(e);topMove(e); break;
        case 'rightTop': rightMove(e);topMove(e); break;
        case 'rightBot': rightMove(e);botMove(e); break;
        case 'leftBot': leftMove(e);botMove(e); break;
        case 'drag': drag(e); break;
      }
      setChoiceHighLight()
      setPreview()
      // 用 switch 语句了
      // if (contact == 'right') {
      //   rightMove(e)
      // }else if (contact == 'top') {
      //   topMove(e)
      // }else if (contact == 'left') {
      //   leftMove(e)
      // }else if (contact == 'bot') {
      //   botMove(e)
      // }else if (contact == 'leftTop') {
      //   leftMove(e)
      //   topMove(e)
      // }else if (contact == 'rightTop') {
      //   rightMove(e)
      //   topMove(e)
      // }else if (contact == 'rightBot') {
      //   rightMove(e)
      //   botMove(e)
      // }else if (contact == 'leftBot') {
      //   leftMove(e)
      //   botMove(e)
      // }
    }
  }
  setPreview() // 首次加载设置预览图的效果

  // right move function
  function rightMove(e) {
    var x = e.clientX; // 鼠标X坐标
    if (x>getPosition(boxDiv).left+boxDiv.offsetWidth) {
      x = getPosition(boxDiv).left+boxDiv.offsetWidth
    };
    var addWidth = ''; // 鼠标移动后选取框增加的宽度
    var widthBefore = mainDiv.offsetWidth; // 这里注意下offsetWidth与clientWidth的区别，前者包含边框，后者不含边框
    var addWidth = x - getPosition(mainDiv).left - widthBefore; // 鼠标移动后增加的宽度
    mainDiv.style.width = addWidth + widthBefore + 'px'; // 选取框变化后的宽度
  }

  function topMove(e) {
    // 点击上边的控点需要改变盒子的高度以及top值
    var y = e.clientY;
    if(y < getPosition(boxDiv).top){
			y = getPosition(boxDiv).top;
		};
    var mainY = getPosition(mainDiv).top;
    var addHeight = mainY - y;
    var heightBefore = mainDiv.offsetHeight;
    mainDiv.style.height = heightBefore + addHeight + 'px';
    mainDiv.style.top = mainDiv.offsetTop - addHeight + 'px';
  }

  function leftMove(e) {
    var x = e.clientX;
    if (x<getPosition(boxDiv).left) {
      x = getPosition(boxDiv).left
    }
    var mainX = getPosition(mainDiv).left;
    var addWidth = mainX - x; // 增加的宽度
    var widthBefore = mainDiv.offsetWidth;
    mainDiv.style.width = widthBefore + addWidth + 'px';
    mainDiv.style.left = mainDiv.offsetLeft - addWidth + 'px';
  }

  function botMove(e) {
    var y = e.clientY;
    if(y > getPosition(boxDiv).top + boxDiv.offsetHeight){
			y = getPosition(boxDiv).top + boxDiv.offsetHeight;
		}
    var heightBefore = mainDiv.offsetHeight;
    var mainY = getPosition(mainDiv).top + heightBefore;
    var addHeight = y - mainY;
    mainDiv.style.height = heightBefore + addHeight + 'px';
  }
  // 这里的拖拽事件不是按老师的做的，自己写的
  function drag(e) {
    var moveX = e.clientX;
    var moveY = e.clientY;
    var newLeft = mainDiv.offsetLeft + moveX - startX;
    var newTop = mainDiv.offsetTop + moveY - startY;
    if (newLeft<0) { newLeft = 0 };
    if (newLeft > imgW-mainDiv.offsetWidth) { newLeft = imgW-mainDiv.offsetWidth };
    if (newTop<0) { newTop = 0 };
    if (newTop> imgH-mainDiv.offsetHeight) { newTop = imgH-mainDiv.offsetHeight };
    mainDiv.style.left =  newLeft + 'px';
    mainDiv.style.top = newTop + 'px';
    startX = moveX;
    startY = moveY;
  }
  // 设置选取区域高亮
  function setChoiceHighLight() {
    var top = mainDiv.offsetTop;
    var right = mainDiv.offsetLeft + mainDiv.offsetWidth;
    var bottom = mainDiv.offsetTop + mainDiv.offsetHeight;
    var left = mainDiv.offsetLeft;
    img1.style.clip = 'rect(' + top + 'px,' + right + 'px,' + bottom + 'px,' + left + 'px)'
  }
  // 设置预览图片
  function setPreview() {
    var top = mainDiv.offsetTop;
    var right = mainDiv.offsetLeft + mainDiv.offsetWidth;
    var bottom = mainDiv.offsetTop + mainDiv.offsetHeight;
    var left = mainDiv.offsetLeft;
    img2.style.clip = 'rect(' + top + 'px,' + right + 'px,' + bottom + 'px,' + left + 'px)'
    img2.style.left = -left + 'px';
    img2.style.top = -top + 'px';
  }
}
// 获取元素相对与屏幕左边和上边的距离 利用 offsetLeft
function getPosition(node) {
  var left = node.offsetLeft;
  var top = node.offsetTop;
  var parent = node.offsetParent;
  while (parent != null) {
    left += parent.offsetLeft;
    top += parent.offsetTop;
    parent = parent.offsetParent;
  }
  return {'left':left,'top':top}
}
