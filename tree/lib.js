;
(function (global, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory(global, true)
    } else {
        factory(global)
    }
})(typeof window !== 'undefined' ? window : this, function (window, noGlobal) {
    var document = window.document

    function Element(tagName, props, children) {
        this.tagName = tagName
        this.props = props
        if (children != null) {
            if (Array.isArray(children)) {
                this.children = children
            } else {
                console.log()
                this.children = [children]
            }
        }
    }

    Element.prototype.render = function () {

        var el = document.createElement(this.tagName)
        var props = this.props

        for (var propName in props) {
            var propValue = props[propName]
            if (propValue !== false) {
                el.setAttribute(propName, propValue)
            }

        }
        var children = this.children || []
        children.forEach(function (child) {
            var childEl = (child instanceof Element) ? child.render() : document.createTextNode(child)
            el.appendChild(childEl)
        })

        this.node = el
        return el
    }

    function createElement(tagName, props, children) {
        return new Element(tagName, props, children)
    }


    function TreeNode(data, node, parent) {
        // this.props = data
        this.node = node
        this.text = data.text
        this.parent = parent
        this.id = data.code
        this.state = data.state
        this.children = []

        this.setSelected = function (flag) {
            if (!this.state.disabled) {
                this.state.selected = flag
                var input = this.node.children[1]
                this.node.children[1].checked = flag
            }
        }
    }

    function DxTree(wrap, data) {
        this.wrap = wrap
        this.data = data
        this.treeNodes = {}
        this.elements = this.createElements(data)
        this.eventHandle = this.eventHandle.bind(this)
        this.wrap.addEventListener('click', this.eventHandle)
        wrap.appendChild(this.elements)
        console.log(this.treeNodes)
    }

    DxTree.prototype.selected = function () {
        var selected = [];
        for (var key in this.treeNodes) {
            var node = this.treeNodes[key];
            if (node.state && node.state.selected) {
                selected.push({ id: node.id, text: node.text })
            }
        }
        console.log(selected)
        return selected
    }

    DxTree.prototype.createElements = function (data, parent) {
        var nodeList = []
        var ul = createElement('ul', null).render()
        for (var i = 0; i < data.length; i++) {
            var item = data[i]
            var input = createElement('input', {
                type: 'checkbox',
                disabled: item.state.disabled ? item.state.disabled : false,
                checked: item.state.selected ? item.state.selected : false
            })

            var p = createElement('p', { 'class': item.state.disabled ? 'disabled' : false, 'data-id': item.code }, [
                createElement('i', { 'class': 'dxtree-icon' }),
                input,
                createElement('span', null, item.text)
            ]).render()


            var li;
            if (data.length - 1 === i) {
                li = createElement('li', { 'class': 'dxtree-node dxtree-node-last', haschild: item.children.length === 0 ? false : '' }).render()
            } else {
                li = createElement('li', { 'class': 'dxtree-node', haschild: item.children.length === 0 ? false : '' }).render()
            }
            var treeNode = new TreeNode(item, p, parent ? parent : null)
            if (parent) {
                parent.children.push(treeNode)
            }
            this.treeNodes[item.code] = treeNode
            li.appendChild(p)
            if (item.children.length > 0) {
                var childUl = this.createElements(item.children, treeNode)
                li.appendChild(childUl)
            }

            ul.appendChild(li)
        }

        return ul
    }


    DxTree.prototype.eventHandle = function (e) {
        // e.preventDefault()
        var tagName = e.target.tagName
        var id;
        if (tagName.toLowerCase() === 'input' || tagName.toLowerCase() === 'span') {
            id = e.target.parentNode.getAttribute('data-id')
            this.toggleSelected(id)
        } else if (tagName.toLowerCase() === 'i') {
            id = e.target.parentNode.getAttribute('data-id')
            this.toggleShow(id)
        }
    }

    DxTree.prototype.toggleSelected = function (id) {
        var treeNode = this.treeNodes[id]
        var parents = [], children = []

        if (treeNode.state.selected) {
            this._getChildren(treeNode, children)
            treeNode.setSelected(false)
            children.forEach(function (item) {
                item.setSelected(false)
            })
        } else {
            this._getParents(treeNode, parents)
            this._getChildren(treeNode, children)
            treeNode.setSelected(true)
            children.forEach(function (item) {
                item.setSelected(true)
            })
            parents.forEach(function (item) {
                item.setSelected(true)
            })
        }
    }

    DxTree.prototype.toggleShow = function (id) {
        var treeNode = this.treeNodes[id]
        var parentNode = treeNode.node.parentNode
        if (parentNode.hasAttribute('close')) {
            parentNode.removeAttribute('close')
        } else {
            parentNode.setAttribute('close', '')
        }
    }


    DxTree.prototype._getParents = function (treeNode, arr) {
        if (treeNode.parent !== null) {
            this._getParents(treeNode.parent, arr);
            arr.push(treeNode.parent)
        }
    }

    DxTree.prototype._getChildren = function (treeNode, arr) {
        if (treeNode.children.length !== 0) {
            for (var i = 0; i < treeNode.children.length; i++) {
                var child = treeNode.children[i];
                arr.push(child);
                this._getChildren(child, arr);
            }
        }
    }

    if (!noGlobal) {
        window.DxTree = DxTree
    }
    return DxTree;
})
