
function tree_test(wrap, data, selected) {
    var nodelist = {}
    wrap.appendChild(renderNode(data))
    wrap.addEventListener('click', function (e) {
        if (e.target.className === 'text' || e.target.className === 'checkbox') {
            if (e.target.hasAttribute('disabled')) {
                return;
            }
            var input = e.target
            if (e.target.className === 'text') {
                input = e.target.previousSibling;
            }
             
            var code = e.target.getAttribute('data-id');
            var treeNode = nodelist[code]
            var parents = [], children = [];

            if (e.target.className === 'text') {
                treeNode.setSelected(!input.checked);
            } else {
                treeNode.setSelected(input.checked);
            }
            
            getChildren(treeNode, children);
            getParents(treeNode, parents);
            if (input.checked) {
                children.forEach(function(treeNode) {
                    treeNode.setSelected(true)
                });

                parents.forEach(function(treeNode) {
                    treeNode.setSelected(true)
                });
            } else {
                children.forEach(function(treeNode) {
                    treeNode.setSelected(false)
                });
            }
           
        } else if (e.target.className === 'icon') {
            var children = [];
            var open = e.target.getAttribute('open')
            if (open == 'open') {
                e.target.setAttribute('open', 'close')
            } else {
                e.target.setAttribute('open', 'open')
            }
            var input = e.target.nextSibling;
            var code = input.getAttribute('data-id');
            var treeNode = nodelist[code];
            getChildren(treeNode, children);
            children.forEach(function(treeNode) {
                if (open == 'open') {
                    treeNode.node.parentNode.style.display = 'none';
                } else {
                    treeNode.node.parentNode.style.display = 'block';
                }
                
            });
        }
    })


    function getParents(treeNode,arr) {
        if (treeNode.parent !== null) {
            getParents(treeNode.parent, arr);
            arr.push(treeNode.parent)
        }
    }

    function getChildren(treeNode, arr) {
        if (treeNode.children.length !== 0) {
            for( var i=0; i<treeNode.children.length; i++) {
                var child = treeNode.children[i];
                arr.push(child);
                getChildren(child, arr);
            }
        }
    }

    function renderNode(data, parent) {
        parent = parent ? parent : null;
        var ul = createElement('ul')
        for (var i = 0; i < data.length; i++) {
            var id = data[i].code;
            var text = data[i].text;
            var selected = data[i].state ? data[i].state.selected : false;
            var active = data[i].active ? data[i].active : false;
            var li = null;
            var iNode = createElement('i','', {className:'icon'})
            if (i == data.length - 1) {
                li = createElement('li', '', {className: 'tree-node tree-node-last'})
            } else if(data[i].children.length) {
                li = createElement('li', '', {className: 'tree-node tree-node-open'})
                iNode = createElement('i','', {className:'icon', open: 'open'})
            } else {
                li = createElement('li', '', {className: 'tree-node'})
            }
           
            var input = null;
            input = createElement('input', '', {className: 'checkbox', type: 'checkbox', 'data-id': id, checked: selected, disabled: !active })

            var span = createElement('span', text, { 'data-id': id, class: 'text', disabled: !active });
            var p = createElement('p')
            var treeNode = new TreeNode(id, text, input, parent, { active: active, selected: selected });
            if (parent) {
                parent.children.push(treeNode)
            }

            nodelist[id] = treeNode
            p.appendChild(iNode);
            p.appendChild(input);
            p.appendChild(span);
            li.appendChild(p)
            if (data[i].children.length !== 0) {
                li.appendChild(renderNode(data[i].children, treeNode));
            }
            ul.appendChild(li)
        }
        return ul;
    }

    function TreeNode(id, text, node, parent, attrs) {

        this.id = id;
        this.text = text;
        this.attrs = attrs;
        this.parent = parent;
        this.node = node;
        this.children = [];

        this.setSelected = function(flag) {
            if (this.attrs.active) {
                this.attrs.selected = flag;
                this.node.checked = flag;
            }
        }
    }
}


function TreeNode(data, node, parent) {
    // this.props = data
    this.node = node
    this.text = data.text
    this.parent = parent
    this.id = data.code
    this.state = data.state
    this.children = []

    this.setSelected = function(flag) {
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

DxTree.prototype.createElements = function(data, parent) {
    var nodeList = []
    var ul = createElement('ul', null).render()
    for (var i=0; i<data.length; i++) {
        var item = data[i]
        var input = createElement('input', {type: 'checkbox', 
            disabled: item.state.disabled ? item.state.disabled: false,
            checked: item.state.selected ? item.state.selected : false}) 

        var p = createElement('p', {'data-id': item.code}, [
            createElement('i', {'class': 'tree-icon'}),
            input,
            createElement('span', null, item.text)
        ]).render()
        
        var li;
        if (data.length - 1 === i) {
            li = createElement('li', {'class': 'tree-node tree-node-last', haschild: item.children.length === 0? false : ''}).render()
        } else {
            li = createElement('li', {'class': 'tree-node', haschild: item.children.length === 0? false : ''}).render()
        }
        var treeNode = new TreeNode(item, p, parent ? parent :null)
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

DxTree.prototype.__createElements = function(data) {
    var nodeList = []
    for (var i=0; i<data.length; i++) {
        var item = data[i]
        var input = item.state.disabled ? createElement('input', {type: 'checkbox', disabled: 'disabled'}) 
            : createElement('input', {type: 'checkbox'})

        var children = [createElement('p', {'data-id': item.code}, [
            createElement('i', {'class': 'tree-icon'}),
            input,
            createElement('span', null, item.text)
        ])]
        if (item.children.length > 0) {
            children.push(this.createElements(item.children))
        }
        var li = createElement('li', {'class': 'tree-node'}, children)
        nodeList.push(li)
    }
   
    return createElement('ul', null, nodeList)
}

DxTree.prototype.eventHandle = function(e) {
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

DxTree.prototype.toggleSelected = function(id) {
    var treeNode = this.treeNodes[id]
    var parents = [], children = []
    
    if (treeNode.state.selected) {
        this._getChildren(treeNode, children)
        treeNode.setSelected(false)
        children.forEach(function(item) {
            item.setSelected(false)
        })
    } else {
        this._getParents(treeNode, parents)
        this._getChildren(treeNode, children)
        treeNode.setSelected(true)
        children.forEach(function(item) {
            item.setSelected(true)
        })
        parents.forEach(function(item) {
            item.setSelected(true)
        })
    }
}

DxTree.prototype.toggleShow = function(id) {
    var treeNode = this.treeNodes[id]
    var parentNode = treeNode.node.parentNode
    if (parentNode.hasAttribute('close')) {
        parentNode.removeAttribute('close')
    } else {
        parentNode.setAttribute('close', '')
    }
}


DxTree.prototype._getParents = function(treeNode,arr) {
    if (treeNode.parent !== null) {
        this._getParents(treeNode.parent, arr);
        arr.push(treeNode.parent)
    }
}

DxTree.prototype._getChildren = function(treeNode, arr) {
    if (treeNode.children.length !== 0) {
        for( var i=0; i<treeNode.children.length; i++) {
            var child = treeNode.children[i];
            arr.push(child);
            this._getChildren(child, arr);
        }
    }
}