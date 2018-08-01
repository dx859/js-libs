var event = {
    clientList: [],
    listen: function (key, fn) {
        if (!this.clientList[key]) {
            this.clientList[key] = []
        }
        this.clientList[key].push(fn)
    },
    trigger: function () {
        var key = Array.prototype.shift.call(arguments), fns = this.clientList[key]

        if (!fns || fns.length === 0) {
            return false;
        }

        for (var i = 0, fn; fn = fns[i++];) {
            fn.apply(this, arguments);
        }
    },
    remove: function(key, fn) {
        var fns = this.clientList[key];
   
        if (!fns) {
            return false
        }
        if (!fn) {
            delete this.clientList[key]
        } else {
            for (var l = fns.length-1; l>=0; l--) {
                var _fn = fns[l];
                if (_fn === fn) {
                    fns.splice(l, 1);
                }
            }
        }
  
    }
}

var initEvent = function (obj) {
    for (var i in event) {
        obj[i] = event[i]
    }
}

var salesOffices = {};
initEvent(salesOffices);

function fn1(price) {
    console.log('price: ', price)
}
function fn2(square) {
    console.log('square: ', square)
}
salesOffices.listen('88', fn1);
salesOffices.listen('88', fn2);
salesOffices.remove('88', fn2);
salesOffices.trigger('88', 2000);