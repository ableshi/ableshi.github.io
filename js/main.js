$(document).ready(function () {
  var sub = $('#sub')

  var activeRow,activeMenu,timer;
  var mouseInSub = false; //表示鼠标是否在子菜单中

  sub.on('mouseenter', function (e) {
    mouseInSub = true
  }).on('mouseleave', function (e) {
    mouseInSub = false
  })

  // 保存鼠标移动时的位置
  var mouseTract = [];

  var moveHandler = function (e) {
    mouseTract.push({
      x: e.pageX,
      y: e.pageY
    })
    if (mouseTract.length>3) {
      mouseTract.shift()
    }
  }

  $('#test').on('mouseenter', function(e){
    sub.removeClass('none')

    $(document).bind('mousemove', moveHandler)
  }).on('mouseleave', function (e) {
    sub.addClass('none');
    if (activeRow) {
      activeRow.removeClass('active')
      activeRow=null
    }

    if (activeMenu) {
      activeMenu.addClass('none');
      activeMenu=null
    }

    $(document).unbind('mousemove', moveHandler)
  }).on('mouseenter', 'li', function (e) {
    if (!activeRow) {
      activeRow = $(e.target).addClass('active')
      activeMenu = $('#' + activeRow.data('id'))
      activeMenu.removeClass('none')
      return
    }


    if (timer) {
      clearInterval(timer)
    }
    // 处理预测用户行为
    var currMousePos = mouseTract[mouseTract.length - 1]
    var leftCorner = mouseTract[mouseTract.length - 2]

    var delay = needDelay(sub, leftCorner, currMousePos)

    if (delay) {
      timer = setTimeout(function () {
        if (mouseInSub) {
          // 如果鼠标在子菜单中，立刻返回，这样就有了300毫秒的延迟，如果300毫秒内用户将鼠标移到了子菜单的话就不会导致出发菜单列表的切换
          return
        }
        activeRow.removeClass('active')
        activeMenu.addClass('none')
        activeRow = $(e.target).addClass('active')
        activeMenu = $('#' + activeRow.data('id')).removeClass('none')
        timer = null
      },300)

    }else {
      var prevActiveRow = activeRow;
      var prevActiveMenu = activeMenu;

      activeRow = $(e.target)
      activeMenu = $('#' + activeRow.data('id'))

      prevActiveRow.removeClass('active')
      prevActiveMenu.addClass('none')

      activeRow.addClass('active')
      activeMenu.removeClass('none')
    }

  })
})

/*
  利用 setTimeout 实现子菜单切换的延迟
  利用 debounce 实现去抖功能，即多次出发事件，只执行最后一次
*/

/*
  基于用户行为预测的切换技术
    跟随鼠标的移动
    用鼠标当前位置，和鼠标上一次位置与子菜单上下边缘形成的三角形区域进行比较
  如何比较
    向量：Vab=Pb-Pa
    二维向量叉乘公式：
      a(x1,y1)*b(x2,y2) = x1*y2-x2*y1
    用叉乘法判断点在三角形内
  最终效果
    鼠标自然的移动和点击到子菜单
    切换时无延迟
*/
