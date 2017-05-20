var imgs = [
  'http://i2.hoopchina.com.cn/user/308/15960308/13383588090.jpg',
  'http://7xopqp.com1.z0.glb.clouddn.com/httpRes.png',
  'http://7xopqp.com1.z0.glb.clouddn.com/newming24.jpg'
]
var index = 0,len = imgs.length, count=0, $progress=$('.progress');

$.each(imgs, function (i, src) {
  var imgObj = new Image()

  $(imgObj).on('load error', function () {
    $progress.html( Math.round((count+1)/len*100) + '%')
    if (count>=len-1) {
      $('.loading').hide()
      document.title = '1/'+len
    }
    count ++;
  })

  imgObj.src = src;
})

$('.btn').on('click', function () {
  if ($(this).data('control') === 'prev') {
    index = Math.max(0, --index) // 将index减一后与0比较，返回大的值
  } else {
    index = Math.min(len-1, ++index)
  }
  document.title = (index+1) + '/' + len;
  $('#img').attr('src', imgs[index])
})
