/*以下为图片预加载的插件*/
(function ($) {
  function PreLoad(imgs, options) {
    this.imgs = (typeof imgs === 'string') ? [imgs] :imgs;
    this.opts = $.extend({}, PreLoad.DEFAULTS, options);

    // 执行无序加载，内部方法，不提供外部调用
    if (this.opts.order === 'ordered') {
      this._ordered();
    }else {
      this._unoredered();
    }
  }
  // 插件的默认属性
  PreLoad.DEFAULTS = {
    order: 'unordered',
    each: null, // 每一张图片加载完毕后执行的函数
    all: null // 所有图片加载完毕后执行的函数
  }
  PreLoad.prototype._ordered = function () { // 有序加载
    var opts = this.opts;
    var imgs = this.imgs;
    var len = imgs.length;
    count = 0;
    function load() {
      var imgObj = new Image()
      $(imgObj).on('load error', function () {
        opts.each && opts.each(count)

        if (count>=len) {
          // 所有图片都加载完成了
          opts.all && opts.all()
        } else {
          load()
        }
        count++
      })

      imgObj.src = imgs[count]
    }
    load()
  }
  PreLoad.prototype._unoredered = function () { // 无序加载
    var imgs = this.imgs;
    var opts = this.opts;
    var count = 0;
    var len = imgs.length;

    $.each(imgs, function (i, src) {
      if (typeof src !='string') return;

      var imgObj = new Image()

      $(imgObj).on('load error', function () {
        opts.each && opts.each(count) //将 count 传回去

        if (count>=len-1) {
          opts.all && opts.all()
        }
        count ++;
      })

      imgObj.src = src;
    })
  }

  $.extend({
    preload: function (imgs, opts) {
      new PreLoad(imgs, opts)
    }
  })
  // 封装为jquery插件的方式
  /*
    $.fn.extend -> $('#box').preload()
    $.extend -> $.preload()
  */
})(jQuery);
