;
(function (global, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = function(tagName, props, children) {
            var Element = factory(global, true)
            return new Element(tagName, props, children)
        }

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


    if (!noGlobal) {
        window.createElement = function(tagName, props, children) {
            return new Element(tagName, props, children)
        }
    }
    return Element
});
