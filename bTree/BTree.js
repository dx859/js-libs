const Node = require('./Node')

class BTree {
  constructor() {
    this.root = null
  }

  insert(data) {
    const n = new Node(data, null, null)

    if (this.root === null) {
      this.root = n
    } else {
      let current = this.root, parent

      while (current) {
        parent = current

        if (data < current.data) {
          current = current.left
          if (current === null) {
            parent.left = n
            break
          }
        } else {
          current = current.right
          if (current === null) {
            parent.right = n
            break
          }
        }
      }
    }
  }

  inOrder(node) {
    if (node === undefined) {
      node = this.root
    }
    if (node !== null) {
      this.inOrder(node.left)
      console.log(node.show())
      this.inOrder(node.right)
    }
  }

  getMin() {
    let current = this.root
    while(current.left !== null) {
      current = current.left
    }
    return current.show()
  }

  getMax() {
    let current = this.root
    while(current.right !== null) {
      current = current.right
    }
    return current.show()
  }

  find(data) {
    let current = this.root

    if (current.data === data) {
      return current
    } else if (current.data > data) {
      current = current.left
    } else {
      current = current.right
    }
    
    return null
  }
}


let b = new BTree()

b.insert(30)
b.insert(20)
b.insert(50)
b.insert(40)
b.insert(20)

b.inOrder()