class ReactDOMTextComponent {
    constructor(text) {
        this._currentElement = text;
        this._rootNodeID = null;
    }

    mountComponent(rootID) {
        this._rootNodeID = rootID;
        return `<span data-reactid=${rootID}>${this._currentElement}</span>`
    }
}

class ReactDOMComponent extends ReactDOMTextComponent {
    constructor(props) {
        super(props);
    }

    mountComponent(rootID) {
        this._rootNodeID = rootID;
        var props = this._currentElement.props;
        var tagOpen = '<' + this._currentElement.type;
        var tagClose = '</' + this._currentElement.type + '>';

        //加上reactid标识
        tagOpen += ' data-reactid=' + this._rootNodeID;

        //拼凑出属性
        for (var propKey in props) {

            //这里要做一下事件的监听，就是从属性props里面解析拿出on开头的事件属性的对应事件监听
            if (/^on[A-Za-z]/.test(propKey)) {
                var eventType = propKey.replace('on', '');
                //针对当前的节点添加事件代理,以_rootNodeID为命名空间
                $(document).delegate('[data-reactid="' + this._rootNodeID + '"]', eventType + '.' + this._rootNodeID, props[propKey]);
            }

            //对于children属性以及事件监听的属性不需要进行字符串拼接
            //事件会代理到全局。这边不能拼到dom上不然会产生原生的事件监听
            if (props[propKey] && propKey != 'children' && !/^on[A-Za-z]/.test(propKey)) {
                tagOpen += ' ' + propKey + '=' + props[propKey];
            }
        }
        //获取子节点渲染出的内容
        var content = '';
        var children = props.children || [];

        var childrenInstances = []; //用于保存所有的子节点的componet实例，以后会用到
        var that = this;
        $.each(children, function (key, child) {
            //这里再次调用了instantiateReactComponent实例化子节点component类，拼接好返回
            var childComponentInstance = instantiateReactComponent(child);
            childComponentInstance._mountIndex = key;

            childrenInstances.push(childComponentInstance);
            //子节点的rootId是父节点的rootId加上新的key也就是顺序的值拼成的新值
            var curRootId = that._rootNodeID + '.' + key;
            //得到子节点的渲染内容
            var childMarkup = childComponentInstance.mountComponent(curRootId);
            //拼接在一起
            content += ' ' + childMarkup;

        })

        //留给以后更新时用的这边先不用管
        this._renderedChildren = childrenInstances;

        //拼出整个html内容
        return tagOpen + '>' + content + tagClose;


    }
}

class ReactElement {
    constructor(type, key, props) {
        this.type = type;
        this.key = key;
        this.props = props;
    }
}

function initReactComponent(node) {
    if (typeof node === 'string' || typeof node === 'number') {
        return new ReactDOMTextComponent(node)
    }
    if (typeof node === 'object' && typeof node.type === 'string') {
        return new ReactDOMComponent(node);
    }
}



React = {
    nextReactRootIndex: 0,

    createElement: function (type, config = {}, children) {
        let key = config.key || null, props = {};
        for (let propName in config) {
            if (config.hasOwnProperty(propName) && propName !== 'key') {
                props[propName] = config[propName]
            }
        }

        let childrenLength = arguments.length - 2;
        if (childrenLength === 1) {
            props.children = Array.isArray(children) ? children : [children]
        } else if (childrenLength > 1) {
            let childArray = Array(childrenLength);
            props.children = childArray.map(function (_, i) {
                return arguments[i + 2]
            })
        }

        return new ReactElement(type, key, props);
    },

    render: function (element, container) {
        let componentInstance = initReactComponent(element);
        let markup = componentInstance.mountComponent(React.nextReactRootIndex++);

        container.innerHTML = markup;
    }
}

React.render('12345', document.getElementById('root'))