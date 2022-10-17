const {NotImplementedError} = require('../extensions/index.js');

const {Node} = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  /////////////////////////////////////////////////////////////////////////
  constructor() {
    this.rootNode = null;
  }
  /////////////////////////////////////////////////////////////////////////
  root() {
    return this.rootNode;
  }
  /////////////////////////////////////////////////////////////////////////
  add(data) {
    let newNode = new Node(data);

    function addNode(newNode, rootNode) {
      if (newNode.data < rootNode.data) {
        if (rootNode.left === null) {
          rootNode.left = newNode
        }
        if (rootNode.left !== null) {
          addNode(newNode, rootNode.left)
        }
      }
      if (newNode.data > rootNode.data) {
        if (rootNode.right === null) {
          rootNode.right = newNode
        }
        if (rootNode.right !== null) {
          addNode(newNode, rootNode.right)
        }
      }
    }
    if (!this.rootNode) {
      this.rootNode = newNode
    } else {
      addNode(newNode, this.rootNode)
    }
  }
  /////////////////////////////////////////////////////////////////////////
  has(data) {
    function hasNode(node, data) {
      if (!node) {
        return false;
      }
      if (data === node.data) {
        return true;
      }
      if (data < node.data) {
        return hasNode(node.left, data)
      }
      if (data > node.data) {
        return hasNode(node.right, data)
      }
    }
    return hasNode(this.rootNode, data);
  }
  /////////////////////////////////////////////////////////////////////////
  find(data) {
    function findNode(node, data) {
      if (!node) {
        return null;
      }
      if (data === node.data) {
        return node;
      }
      if (data < node.data) {
        return findNode(node.left, data)
      }
      if (data > node.data) {
        return findNode(node.right, data)
      }
    }
    return findNode(this.rootNode, data);
  }
  /////////////////////////////////////////////////////////////////////////
  remove(data) {
    this.root = deleteNode(this.rootNode, data);

    function deleteNode(node, data) {
      if (!node) {
        return null;
      }
      if (data < node.data) {
        node.left = deleteNode(node.left, data);
        return node;
      } else if (data > node.data) {
        node.right = deleteNode(node.right, data);
        return node;
      } else {
        if (!node.left && !node.right) {
          return null;
        }
        if (!node.right) {
          node = node.left;
          return node;
        }
        if (!node.right) {
          node = node.right;
          return node;
        }
        let rightMin = node.right;
        while (rightMin.left) {
          rightMin = rightMin.left;
        }
        node.data = rightMin.data;
        node.right = deleteNode(node.right, rightMin.data);
        return node;
      }
    }
  }
  /////////////////////////////////////////////////////////////////////////
  min() {
    if (!this.rootNode) {
      return null;
    }
    let node = this.rootNode;
    while (node.left) {
      node = node.left;
    }
    return node.data;
  }
  /////////////////////////////////////////////////////////////////////////
  max() {
    if (!this.rootNode) {
      return null;
    }
    let node = this.rootNode;
    while (node.right) {
      node = node.right;
    }
    return node.data;
  }
}

module.exports = {
  BinarySearchTree
};