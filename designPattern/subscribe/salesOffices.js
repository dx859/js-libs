var salesOffices = {}; // 定义售楼处
salesOffices.clientList = []; // 缓存列表，存放订阅者的回调函数

salesOffices.listen = function (key, fn) {
    if (!this.clientList[key]) {
        this.clientList[key] = [];
    }
    this.clientList[key].push(fn);
}

salesOffices.trigger = function (...args) {
    var key = args.shift(), fns = this.clientList[key];
    if (!fns || fns.length === 0) {
        return false;
    }
    for (var i = 0, fn; fn = fns[i++];) {
        fn.apply(this, args);
    }
}

salesOffices.listen('88', function (price, squareMeter) {
    console.log('价格= ' + price, 'squareMete= ' + squareMeter);
})

salesOffices.listen('118', function (price) {
    console.log('价格= ' + price);
})

salesOffices.trigger('88', 2000000, 88)
salesOffices.trigger('118', 3000000, 118)