const printFunction = node => {
  console.log(node.value);
}

class Node {
  constructor(value) {
    this.value = value;

    this.right = null;
    this.left = null;
  }

  insert(value) {
    if (value < this.value) {
      // insert into left subtree
      if (this.left === null) {
        this.left = new Node(value);
      } else {
        this.left.insert(value);
      }
    } else {
      // insert into right subtree
      if (this.right === null) {
        this.right = new Node(value);
      } else {
        this.right.insert(value);
      }
    }
  }

  preorder(processFunction = printFunction) {
    processFunction(this);

    if (this.left !== null) {
      this.left.preorder(processFunction);
    }

    if (this.right !== null) {
      this.right.preorder(processFunction);
    }
  }

  inorder(processFunction) {
    if (this.left !== null) {
      this.left.inorder(processFunction);
    }

    processFunction(this);

    if (this.right !== null) {
      this.right.inorder(processFunction);
    }
  }

  postorder(processFunction = printFunction) {
    if (this.left !== null) {
      this.left.postorder(processFunction);
    }

    if (this.right !== null) {
      this.right.postorder(processFunction);
    }

    processFunction(this);
  }

  height() {
    return 1 + Math.max(
      this.left === null ? 0 : this.left.height(),
      this.right === null ? 0 : this.right.height()
    )
  }

  hash() {
    return `${this.value}:${this.left === null ? 'n' : this.left.value}:${this.right === null ? 'n' : this.right.value}`
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    if (this.root === null) {
      // When the tree is empty, just create a new node with the value,
      // and the new node becomes the root
      this.root = new Node(value);
    } else {
      this.root.insert(value);
    }
  }

  preorder(fn) {
    if (this.root !== null) {
      this.root.preorder(fn);
    }
  }

  inorder(fn) {
    if (this.root !== null) {
      this.root.inorder(fn);
    }
  }

  postorder(fn) {
    if (this.root !== null) {
      this.root.postorder(fn);
    }
  }

  height() {
    return this.root.height();
  }

  toString() {
    if (this.root === null) {
      return "";
    }

    const treeHeight = this.height();

    // Initialize next available offset for every possible level
    // (+1 level to avoid some extra code to check levels before updating)
    const nextAvailableOffset = [];
    for (let i = 0; i <= treeHeight; i++) {
      nextAvailableOffset[i] = 0;
    }

    const nodeOffsets = {};

    // Utility function for shifting subtrees
    const shiftTreeBy = x => node => {
      nodeOffsets[node.hash()] = nodeOffsets[node.hash()] + x;
      nextAvailableOffset[treeHeight - node.height()] += x;
    }

    // To avoid typos later, just constantizing our special offset value
    // (this was chosen to make the layout math easier)
    const OFFSET_INCREMENT = 2;

    // Traverse the tree, calculating the offset (from left) of each node
    this.postorder(node => {
      let offset, level = treeHeight - node.height();

      if (node.left === null && node.right === null) {
        // The most straightforward case is when we are at a leaf node,
        // in which case we can use the next available offset at the current level,
        // and update the next available offset at the current level by our OFFSET_INCREMENT
        nodeOffsets[node.hash()] = nextAvailableOffset[level];
        nextAvailableOffset[level] += OFFSET_INCREMENT;
      } else {
        if (node.left === null) {
          // update right subtree offsets by 2 to accommodate the empty left slot
          node.right.postorder(shiftTreeBy(2))

          // If the calculated offset, based on the current node's children,
          // is less than the next available offset at this level, we shift
          // the subtree to accommodate
          offset = nodeOffsets[node.right.hash()] - 1;
          if (offset < nextAvailableOffset[level]) {
            node.inorder(shiftTreeBy(nextAvailableOffset[level] - offset));
          }

          nodeOffsets[node.hash()] = nodeOffsets[node.right.hash()] - 1;
        } else if (node.right === null) {
          // Update the next level's next available offset to accommodate the
          // empty right slot
          nextAvailableOffset[level + 1] += OFFSET_INCREMENT;

          // If the calculated offset, based on the current node's children,
          // is less than the next available offset at this level, we shift
          // the subtree to accommodate
          offset = nodeOffsets[node.left.hash()] + 1;
          if (offset < nextAvailableOffset[level]) {
            node.inorder(shiftTreeBy(nextAvailableOffset[level] - offset))
          }

          nodeOffsets[node.hash()] = nodeOffsets[node.left.hash()] + 1;
        } else {
          offset = Math.floor((nodeOffsets[node.left.hash()] + nodeOffsets[node.right.hash()]) / 2);

          if (offset < nextAvailableOffset[level]) {
            node.inorder(shiftTreeBy(nextAvailableOffset[level] - offset))
          }
          nodeOffsets[node.hash()] = Math.floor((nodeOffsets[node.left.hash()] + nodeOffsets[node.right.hash()]) / 2);
        }

        // Finally, since we've finished the offset calculation for this node, we
        // update the next available offset at this level by our OFFSET_INCREMENT
        nextAvailableOffset[level] = nodeOffsets[node.hash()] + OFFSET_INCREMENT;
      }
    })

    // At this point, we now know the distance from the left side of our print
    // area that we need in order to display a node. We will use this to construct
    // a unit matrix of node positions in order to pretty print our tree:
    const maxOffset = nextAvailableOffset.reduce((currentMax, offset) => {
      return Math.max(currentMax, offset);
    })
    // Construct the matrix where rows = tree height and columns = maxoffset
    const matrix = [];
    for (let i = 0; i < treeHeight; i++) {
      matrix[i] = [];
    }
    // Finally, we can perform a level order traversal to position each
    // node in the unit matrix.
    const queue = [{ node: this.root, level: 0 }];

    while (queue.length > 0) {
      const { node, level } = queue.shift();

      matrix[level][nodeOffsets[node.hash()]] = node.value;

      if (node.left !== null) {
        queue.push({ node: node.left, level: level + 1 });
      }
      if (node.right !== null) {
        queue.push({ node: node.right, level: level + 1 });
      }
    }

    // Convert the matrix into a pretty string
    let result = "";
    for (let row = 0; row < matrix.length; row++) {
      for (let col = 0; col < matrix[row].length; col++) {
        if (matrix[row][col] === undefined) {
          result = result + "  ";
        } else {
          result = result + matrix[row][col];
        }
      }
      result = result + "\n"
    }

    return result;
  }
}

(() => {
  const tree = new BinarySearchTree();

  tree.insert(10);
  tree.insert(5);
  tree.insert(15);
  tree.insert(1);
  tree.insert(7);
  tree.insert(12);
  tree.insert(42);
  tree.insert(0);

  console.log(tree.toString());

  // console.log("Preorder")
  // tree.preorder();

  // console.log("Inorder");
  // tree.inorder(printFunction);

  // console.log("Postorder");
  // tree.postorder();
})()