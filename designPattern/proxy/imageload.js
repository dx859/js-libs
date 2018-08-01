var myImage = (function () {
  var imgNode = document.createElement('img');
  document.body.appendChild(imgNode);

  return {
    setSrc: function (src) {
      imgNode.src = src;
    }
  }
})();

var proxyImage = (function () {
  var img = new Image;
  img.onload = function (ev) {
    myImage.setSrc(this.src);
  };
  return {
    setSrc: function (src) {
      myImage.setSrc('./loading.png');
      img.src = src;
    }
  }
})();

proxyImage.setSrc('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1533094793&di=ddf86f6c8860d444a02f8931ca99f5db&imgtype=jpg&er=1&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0117e2571b8b246ac72538120dd8a4.jpg%401280w_1l_2o_100sh.jpg');


