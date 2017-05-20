// 判断符号是否相同
function sameSign(a, b) {
  // 二进制用首位数字表示，1为负，0为正。
  // 异或运算，仅当有一位为1返回1
  return (a ^ b) >= 0
}

// 向量的定义
function vector(a, b) {
  return {
    x: b.x - a.x,
    y: b.y - a.y
  }
}

// 向量的叉乘工具
function vectorProduct(v1, v2) {
  return v1.x*v2.y - v2.x*v1.y
}

// 获取右侧子菜单上下边缘坐标
function isPointInTrangle(p, a, b, c) {
  var pa = vector(p, a)
  var pb = vector(p, b)
  var pc = vector(p, c)

  var t1 = vectorProduct(pa, pb)
  var t2 = vectorProduct(pb, pc)
  var t3 = vectorProduct(pc, pa)

  return sameSign(t1, t2) && sameSign(t2, t3)
}

// 判断是否需要延迟
function needDelay(elem, leftCorner, currMousePos) {
  var offset = elem.offset()

  var topLeft = {
    x: offset.left,
    y: offset.top
  }
  var bottomLeft = {
    x: offset.left,
    y: offset.top + elem.height()
  }

  return isPointInTrangle(currMousePos, leftCorner, topLeft, bottomLeft)
}
