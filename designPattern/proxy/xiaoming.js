var Flower = function () {};

var xiaoming = {
  sendFlower: function (target) {
    var flower = new Flower();
    target.reciveFlower(flower);
  }
};

var B = {
  reciveFlower: function (flower) {
    A.listenGoodMood(function () {
      A.reciveFlower(flower)
    });
  }
};

var A = {
  reciveFlower: function (flower) {
    console.log('收到花' + flower);
  },
  listenGoodMood:function (fn) {
    setTimeout(function () {
      fn();
    }, 10000);
  }
};

xiaoming.sendFlower(B);